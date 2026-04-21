package com.college.placement.exception;

/**
 * Exception for invalid JWT token
 */
public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException(String message) {
        super(message);
    }
}
