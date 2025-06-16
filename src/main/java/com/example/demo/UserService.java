package com.example.demo;

import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;
import java.nio.file.*;


@Service
public class UserService {

    private final File usersFile = new File("users.txt");

    // Registro de usuarios
    public User registerUser(User user) {
        if (userExists(user.getUsername())) {
            throw new RuntimeException("El usuario ya existe");
        }
        appendUserToFile(user);
        return user;
    }

    // Autenticar usuarios
    public User authenticateUser(User user) {
        User storedUser = getUserByUsername(user.getUsername());
        if (storedUser != null && storedUser.getPassword().equals(user.getPassword())) {
            return storedUser;
        }
        return null;
    }

    // Obtener puntuación de un usuario
    public Integer getUserScore(String username) {
        User user = getUserByUsername(username);
        return user != null ? user.getScore() : null;
    }

    // Actualizar puntuación de un usuario
    public void updateUserScore(User user) {
        System.out.println("Actualizando puntuación de usuario: " + user.getUsername() + " a " + user.getScore());
        List<User> users = readAllUsers();
        boolean found = false;
        for (User u : users) {
            if (u.getUsername().equals(user.getUsername())) {
                u.setScore(user.getScore());
                found = true;
                break;
            }
        }
        if (!found) {
            throw new RuntimeException("Usuario no encontrado");
        }
        System.out.println("Escribiendo usuarios actualizados...");
        writeAllUsers(users);
    }

    // Generar un token simple
    public String generateToken(User user) {
        return "token-" + user.getUsername();
    }

    // Validar un token simple
    public boolean validateToken(String token) {
        if (token == null || !token.startsWith("token-")) {
            return false;
        }
        String username = token.substring(6);
        return userExists(username);
    }

    // ---- Métodos auxiliares para manejar el archivo ----

    private boolean userExists(String username) {
        return getUserByUsername(username) != null;
    }

    private User getUserByUsername(String username) {
        try (BufferedReader reader = new BufferedReader(new FileReader(usersFile))) {
            String line;
            while ((line = reader.readLine()) != null) {
                User user = parseUser(line);
                if (user != null && user.getUsername().equals(username)) {
                    return user;
                }
            }
        } catch (FileNotFoundException e) {
            // archivo no existe aún, usuario no existe
            return null;
        } catch (IOException e) {
            throw new RuntimeException("Error al leer archivo de usuarios", e);
        }
        return null;
    }

    private void appendUserToFile(User user) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(usersFile, true))) {
            String line = user.getUsername() + "," + user.getPassword() + "," + user.getScore();
            writer.write(line);
            writer.newLine();
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar el usuario en archivo", e);
        }
    }

    private List<User> readAllUsers() {
        List<User> users = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(usersFile))) {
            String line;
            while ((line = reader.readLine()) != null) {
                User user = parseUser(line);
                if (user != null) {
                    users.add(user);
                }
            }
        } catch (FileNotFoundException e) {
            // archivo no existe, lista vacía
        } catch (IOException e) {
            throw new RuntimeException("Error al leer archivo de usuarios", e);
        }
        return users;
    }

    private void writeAllUsers(List<User> users) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(usersFile, false))) {
            for (User user : users) {
                String line = user.getUsername() + "," + user.getPassword() + "," + user.getScore();
                writer.write(line);
                writer.newLine();
            }
        } catch (IOException e) {
            throw new RuntimeException("Error al escribir archivo de usuarios", e);
        }
    }

    private User parseUser(String line) {
        String[] parts = line.split(",");
        if (parts.length != 3) {
            return null;
        }
        try {
            String username = parts[0];
            String password = parts[1];
            int score = Integer.parseInt(parts[2]);
            return new User(username, password, score);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    public void deleteUser(String username) {
        List<User> users = readAllUsers();
        boolean removed = users.removeIf(u -> u.getUsername().equals(username));
        if (!removed) {
            throw new RuntimeException("Usuario no encontrado");
        }
        writeAllUsers(users);
    }

    public void changeUserPassword(String username, String oldPassword, String newPassword) {
        List<User> users = readAllUsers();
        boolean updated = false;

        for (User user : users) {
            if (user.getUsername().equals(username)) {
                if (!user.getPassword().equals(oldPassword)) {
                    throw new RuntimeException("La contraseña actual no es correcta");
                }
                user.setPassword(newPassword);
                updated = true;
                break;
            }
        }

        if (!updated) {
            throw new RuntimeException("Usuario no encontrado");
        }

        writeAllUsers(users);
    }
}
