package main.java.com.example.demo;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.example.gameapi.model.User;
import com.example.gameapi.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Registro de un nuevo usuario
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    // Inicio de sesión de un usuario
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        User authenticatedUser = userService.authenticateUser(user);
        if (authenticatedUser != null) {
            return ResponseEntity.ok(authenticatedUser);
        } else {
            return ResponseEntity.status(401).body(null); // Unauthorized
        }
    }

    // Obtener la puntuación de un usuario
    @GetMapping("/score/{username}")
    public ResponseEntity<Integer> getUserScore(@PathVariable String username) {
        Integer score = userService.getUserScore(username);
        return score != null ? ResponseEntity.ok(score) : ResponseEntity.notFound().build();
    }

    // Actualizar la puntuación de un usuario
    @PostMapping("/updateScore")
    public ResponseEntity<String> updateUserScore(@RequestBody User user) {
        userService.updateUserScore(user);
        return ResponseEntity.ok("Puntuación actualizada correctamente");
    }
}
