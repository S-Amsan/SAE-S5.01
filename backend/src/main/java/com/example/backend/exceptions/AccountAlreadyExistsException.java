package com.example.backend.exceptions;

public class AccountAlreadyExistsException extends RuntimeException {

    public AccountAlreadyExistsException(final String email) {
        super("Account already exists for email " + email);
    }
}
