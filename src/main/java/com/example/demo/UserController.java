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
    public ResponseEntity<Integer> getUserScore(@PathVariable String username) {
        // if (!userService.validateToken(token)) {
        //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // Token no válido
        // }
        Integer score = userService.getUserScore(username);
        return score != null ? ResponseEntity.ok(score) : ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PutMapping("/updateScore")
    public ResponseEntity<String> updateScore(@RequestBody User user, @RequestHeader("Authorization") String token) {
        System.out.println("Se recibió solicitud para actualizar puntuación de: " + user.getUsername());
        if (!userService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token no válido");
        }

        try {
            // Obtener puntuación actual
            Integer current = userService.getUserScore(user.getUsername());
            if (current != null && user.getScore() > current) {
                userService.updateUserScore(user);
                return ResponseEntity.ok("Puntuación actualizada");
            } else {
                return ResponseEntity.ok("No se actualizó (menor o igual)");
            }
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/changePassword")
    public ResponseEntity<String> changePassword(
        @RequestBody PasswordChangeRequest changeRequest,
        @RequestHeader("Authorization") String token) {
        
        if (!userService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token no válido");
        }

        try {
            userService.changeUserPassword(
                changeRequest.getUsername(),
                changeRequest.getOldPassword(),
                changeRequest.getNewPassword()
            );
            return ResponseEntity.ok("Contraseña actualizada correctamente");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
        return ResponseEntity.ok().build();
    }


    // Clase DTO para el cambio de contraseña
    public static class PasswordChangeRequest {
        private String username;
        private String oldPassword;
        private String newPassword;

        // Getters y setters
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getOldPassword() { return oldPassword; }
        public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }
        public String getNewPassword() { return newPassword; }
        public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    }
}
