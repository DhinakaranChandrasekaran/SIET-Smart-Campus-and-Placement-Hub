package com.college.placement.exception;

/**
 * Exception for unauthorized access
 */
public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
}
