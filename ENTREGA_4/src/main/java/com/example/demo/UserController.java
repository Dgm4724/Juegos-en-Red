package com.example.demo;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Registro de un nuevo usuario
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado correctamente");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Inicio de sesión de un usuario
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        User authenticatedUser = userService.authenticateUser(user);
        if (authenticatedUser != null) {
            String token = userService.generateToken(authenticatedUser); // Generar un token
            return ResponseEntity.ok(token); // Devuelve el token como respuesta
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }
    }

    // Obtener la puntuación de un usuario
    @GetMapping("/score/{username}")
    public ResponseEntity<Integer> getUserScore(@PathVariable String username, @RequestHeader("Authorization") String token) {
        if (!userService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // Token no válido
        }
        Integer score = userService.getUserScore(username);
        return score != null ? ResponseEntity.ok(score) : ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    // Actualizar la puntuación de un usuario
    @PostMapping("/updateScore")
    public ResponseEntity<String> updateUserScore(@RequestBody User user, @RequestHeader("Authorization") String token) {
        if (!userService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token no válido");
        }
        try {
            userService.updateUserScore(user);
            return ResponseEntity.ok("Puntuación actualizada correctamente");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
