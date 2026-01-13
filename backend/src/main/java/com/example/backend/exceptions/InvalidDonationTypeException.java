package com.example.backend.exceptions;

public class InvalidDonationTypeException extends RuntimeException {

    public InvalidDonationTypeException(String type) {
        super("Invalid donation type: " + type);
    }
}
