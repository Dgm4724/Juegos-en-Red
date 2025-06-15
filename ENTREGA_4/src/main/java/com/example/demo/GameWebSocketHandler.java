package com.example.demo;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.*;

@Component
public class GameWebSocketHandler extends TextWebSocketHandler {
    // Thread-safe collections for managing game state
    private final Map<String, Player> players = new ConcurrentHashMap<>();
    private final Queue<WebSocketSession> creators = new ConcurrentLinkedQueue<>();
    private final Queue<WebSocketSession> joiners = new ConcurrentLinkedQueue<>();
    private final Map<String, Game> games = new ConcurrentHashMap<>();
    private final Queue<WebSocketSession> waitingPlayers = new ConcurrentLinkedQueue<>();
    private final ObjectMapper mapper = new ObjectMapper();
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    private static class Player {
        WebSocketSession session;
        double x;
        double y;
        int playerId;

        Player(WebSocketSession session) {
            this.session = session;
        }
    }

    private static class Game {
        String scene;
        Player player1;
        Player player2;
        Ball ball;
        ScheduledFuture<?> timerTask;

        Game(Player player1, Player player2) {
            this.player1 = player1;
            this.player2 = player2;
        }
        Game(Player player1, Player player2, Ball ball) {
            this.player1 = player1;
            this.player2 = player2;
            this.ball = ball;
        }
    }

    private static class Ball {
        int x;
        int y;

        Ball(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    /**
     * Handles new WebSocket connections by creating a player and adding them to the
     * waiting queue.
     */
    @Override
        public void afterConnectionEstablished(WebSocketSession session) {
            String uri = session.getUri().toString();
            if (uri.contains("mode=create")) {
                creators.add(session);
            } else if (uri.contains("mode=join")) {
                joiners.add(session);
            }

            players.put(session.getId(), new Player(session));

            synchronized (this) {
                checkAndCreateGame(); // se emparejan 1 creador y 1 unido
            }
        }


    /**
     * Attempts to create a new game if there are at least 2 players waiting.
     * Sets up initial player positions and starts the game.
     */
    private synchronized void checkAndCreateGame() {
    if (!creators.isEmpty() && !joiners.isEmpty()) {
        WebSocketSession session1 = creators.poll(); // Jugador que crea
        WebSocketSession session2 = joiners.poll();   // Jugador que se une

        if (session1 != null && session2 != null) {
            Player player1 = players.get(session1.getId());
            Player player2 = players.get(session2.getId());

            // IDs y posiciones
            player1.playerId = 1;
            player2.playerId = 2;
            player1.x = 250; player1.y = 400;
            player2.x = 470; player2.y = 400;

            Game game = new Game(player1, player2);
            games.put(session1.getId(), game);
            games.put(session2.getId(), game);

            startGame(game);
        }
    }
}


    /**
     * Initializes a new game by sending initial states to players and starting the
     * game loop.
     * Message format 'i': Initial game state with player positions and colors
     */
    private void startGame(Game game) {
        // Create initial player data: [x, y, playerId, color]
        List<List<Object>> playersData = Arrays.asList(
                Arrays.asList(game.player1.x, game.player1.y, 1, 0xff0000), // Player 1: Red
                Arrays.asList(game.player2.x, game.player2.y, 2, 0x0000ff) // Player 2: Blue
        );

        // Send initial state to both players
        sendToPlayer(game.player1, "i", Map.of("id", 1, "p", playersData));
        sendToPlayer(game.player2, "i", Map.of("id", 2, "p", playersData));

        // Start game timer that runs every second
        game.timerTask = scheduler.scheduleAtFixedRate(() -> {
            gameLoop(game);
        }, 0, 1, TimeUnit.SECONDS);
    }

    /**
     * Main game loop that runs every second.
     * Message format 't': Time update
     */
    private void gameLoop(Game game) {
        
    }

    /**
     * Handles incoming WebSocket messages from players.
     * Message types:
     * 'p': Position update [x, y]
     */
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        try {

            Game game = games.get(session.getId());

            if (game == null)
                return;

            Player currentPlayer = players.get(session.getId());
            Player otherPlayer = game.player1 == currentPlayer ? game.player2 : game.player1;

            String payload = message.getPayload();
            char type = payload.charAt(0);
            String data = payload.length() > 1 ? payload.substring(1) : "";

            switch (type) {
                case 'p': // Position update
                    List<Integer> pos = mapper.readValue(data, List.class);

                    // We could synchronize currentPlayer, but we will not have concurrent updates
                    currentPlayer.x = pos.get(0);
                    currentPlayer.y = pos.get(1);

                    // Broadcast position to other player
                    sendToPlayer(otherPlayer, "p",
                            Arrays.asList(currentPlayer.playerId, currentPlayer.x, currentPlayer.y));
                    break;
                case 's': // Escenario elegido
                    if (currentPlayer.playerId == 1) {
                        Game g = games.get(session.getId());
                        if (g != null) {
                            g.scene = data;
                            // Enviar escenario a ambos jugadores
                            sendToPlayer(g.player1, "s", data);
                            sendToPlayer(g.player2, "s", data);
                        }
                    }
                    break;
                }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Ends the game by sending final scores and cleaning up game resources.
     * Message format 'o': Game over with final scores [player1Score, player2Score]
     */
    private void endGame(Game game) {

        if (this.players.containsKey(game.player1.session.getId())) {
            sendToPlayer(game.player1, "o", 0);
        }

        if (this.players.containsKey(game.player2.session.getId())) {
            sendToPlayer(game.player2, "o", 0);
        }

        // Cancel timer and cleanup game resources
        if (game.timerTask != null) {
            game.timerTask.cancel(false);
        }

        games.remove(game.player1.session.getId());
        games.remove(game.player2.session.getId());
    }

    /**
     * Handles WebSocket connection closures by cleaning up player and game
     * resources.
     */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        players.remove(session.getId());
        waitingPlayers.remove(session);

        Game game = games.remove(session.getId());
        if (game != null) {
            endGame(game);
        }

    }

    /**
     * Sends a message to a specific player with the given type and data.
     * Messages are formatted as: type + JSON data
     * 
     * @param player The target player
     * @param type   Single character message type
     * @param data   Data to be JSON serialized (can be null)
     */
    private void sendToPlayer(Player player, String type, Object data) {
        try {
            String message = type;
            if (data != null) {
                message += mapper.writeValueAsString(data);
            }
            synchronized (player.session) {
                player.session.sendMessage(new TextMessage(message));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}