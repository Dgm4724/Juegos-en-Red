package com.example.demo;

public class UserDTO {
    private String username;

    private Integer score;
    public UserDTO(User user)
    {
        this.username = user.getUsername();
        this.score = user.getScore();
    }
    public String getUsername()
    {
        return this.username;
    }
    public Integer getScore()
    {
        return this.score;
    }
}
