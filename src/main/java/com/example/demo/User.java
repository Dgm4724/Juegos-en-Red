package com.example.demo;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class User {
    private String username;

    @JsonIgnore // No incluir la contraseña en las respuestas JSON
    private String password;

    private Integer score;

    // Constructor
    public User() {}

    public User(String username, String password, Integer score) {
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

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }
}