package main.java.com.example.demo;

public class User {

    private String username;
    private String password;
    private int score;

    // Constructor, getters y setters

    public User() {}

    public User(String username, String password, int score) {
        this.username = username;
        this.password = password;
        this.score = score;
    }

    // Getters y setters

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
