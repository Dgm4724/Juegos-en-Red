package com.example.demo;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    // Almacén en memoria (simulación de base de datos)
    private Map<String, User> userDatabase = new HashMap<>();

    // Registro de usuarios
    public User registerUser(User user) {
        if (userDatabase.containsKey(user.getUsername())) {
            throw new RuntimeException("El usuario ya existe");
        }
        userDatabase.put(user.getUsername(), user);
        return user;
    }

    // Autenticar usuarios
    public User authenticateUser(User user) {
        User storedUser = userDatabase.get(user.getUsername());
        if (storedUser != null && storedUser.getPassword().equals(user.getPassword())) {
            return storedUser; // Autenticado
        }
        return null; // No autenticado
    }

    // Obtener puntuación de un usuario
    public Integer getUserScore(String username) {
        User user = userDatabase.get(username);
        return user != null ? user.getScore() : null;
    }

    // Actualizar puntuación de un usuario
    public void updateUserScore(User user) {
        User storedUser = userDatabase.get(user.getUsername());
        if (storedUser != null) {
            storedUser.setScore(user.getScore());
        } else {
            throw new RuntimeException("Usuario no encontrado");
        }
    }

    // Generar un token simple (se recomienda usar JWT en un proyecto real)
    public String generateToken(User user) {
        return "token-" + user.getUsername(); // Token básico basado en el nombre de usuario
    }

    // Validar un token simple
    public boolean validateToken(String token) {
        if (token == null || !token.startsWith("token-")) {
            return false;
        }
        String username = token.substring(6); // Extraer el nombre de usuario del token
        return userDatabase.containsKey(username);
    }
}
