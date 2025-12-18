package com.example.backend.controller;

import com.example.backend.exceptions.AccountAlreadyExistsException;
import com.example.backend.model.http.res.ApiError;
import io.jsonwebtoken.ExpiredJwtException;
import java.time.LocalDateTime;
import java.util.stream.Collectors;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Declares global ExceptionHandler's to handle exception thrown from controller methods.
 */
@ControllerAdvice
public class RestExceptionHandler {

    /**
     * Handles validation exceptions for invalid endpoint arguments.
     *
     * @param ex the exception containing validation errors
     * @return a ResponseEntity containing the error details
     *
     * Example JSON response:
     * {@code
     * {
     *   "timestamp": "2024-02-08T12:34:56",
     *   "status": 400,
     *   "error": "Bad Request",
     *   "message": "Validation of fields failed: field1 is required, field2 must be numeric"
     * }
     * }
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationException(
        MethodArgumentNotValidException ex
    ) {
        final String messages = ex
            .getFieldErrors()
            .stream()
            .map(DefaultMessageSourceResolvable::getDefaultMessage)
            .collect(Collectors.joining(", "));

        return buildResponse(
            HttpStatus.BAD_REQUEST,
            "Validation of fields failed: " + messages
        );
    }

    /**
     * Handles authentication exceptions, such as BadCredentialsException, UsernameNotFoundException...
     *
     * @param ex the authentication exception
     * @return a ResponseEntity containing the error details
     *
     * Example JSON response:
     * {@code
     * {
     *   "timestamp": "2024-02-08T12:34:56",
     *   "status": 401,
     *   "error": "Unauthorized",
     *   "message": "Invalid username or password"
     * }
     * }
     */
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiError> handleAuthenticationException(
        AuthenticationException ex
    ) {
        System.out.println("Handling AuthenticationException ");
        return buildResponse(HttpStatus.UNAUTHORIZED, "Invalid credentials");
    }

    /**
     * Handles expired JWT token exceptions.
     *
     * @param ex the expired JWT exception
     * @return a ResponseEntity containing the error details
     *
     * Example JSON response:
     * {@code
     * {
     *   "timestamp": "2024-02-08T12:34:56",
     *   "status": 401,
     *   "error": "Unauthorized",
     *   "message": "Provided token is expired"
     * }
     * }
     */
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ApiError> handleExpiredJwtException(
        ExpiredJwtException ex
    ) {
        System.out.println("Handling ExpiredJwtException");
        return buildResponse(
            HttpStatus.UNAUTHORIZED,
            "Provided token is expired"
        );
    }

    @ExceptionHandler(AccountAlreadyExistsException.class)
    public ResponseEntity<ApiError> handleAccountAlreadyExistsException(
        AccountAlreadyExistsException ex
    ) {
        return buildResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    /**
     * Builds a structured API error response.
     *
     * @param status  the HTTP status code
     * @param message the error message
     * @return a ResponseEntity containing the formatted error response
     */
    private ResponseEntity<ApiError> buildResponse(
        HttpStatus status,
        String message
    ) {
        final ApiError body = ApiError.builder()
            .timestamp(LocalDateTime.now())
            .status(status.value())
            .error(status.getReasonPhrase())
            .message(message)
            .build();

        return new ResponseEntity<>(body, status);
    }
}
