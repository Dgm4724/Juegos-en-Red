package com.example.demo;

public class ChatMessage
{
    int ID;
    String message;

    ChatMessage(int id, String t)
    {
        this.ID = id;
        this.message = t;
    }
    public int getId() {
        return ID;
    }

    public String getText() {
        return message;
    }
}
