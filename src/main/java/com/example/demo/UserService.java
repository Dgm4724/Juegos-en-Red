package main.java.com.example.demo;

import org.springframework.stereotype.Service;
import com.example.gameapi.model.User;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    private final Map<String, User> userDatabase = new HashMap<>();

    public User registerUser(User user) {
        userDatabase.put(user.getUsername(), user);
        return user;
    }

    public User authenticateUser(User user) {
        User existingUser = userDatabase.get(user.getUsername());
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return existingUser;
        }
        return null;
    }

    public Integer getUserScore(String username) {
        User user = userDatabase.get(username);
        return user != null ? user.getScore() : null;
    }

    public void updateUserScore(User user) {
        userDatabase.put(user.getUsername(), user);
    }
}
