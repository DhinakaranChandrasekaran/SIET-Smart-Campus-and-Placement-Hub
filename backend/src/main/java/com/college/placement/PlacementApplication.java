package com.college.placement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * Main Application Class for College Placement Management System
 * 
 * @author SIET
 * @version 1.0
 */
@SpringBootApplication
@EnableAsync
public class PlacementApplication {

    public static void main(String[] args) {
        SpringApplication.run(PlacementApplication.class, args);
        System.out.println("\n" +
                "╔═══════════════════════════════════════════════════════════════╗\n" +
                "║   College Placement Management System - Backend Started      ║\n" +
                "║   API Base URL: http://localhost:8080/api                    ║\n" +
                "║   Swagger UI: http://localhost:8080/api/swagger-ui.html      ║\n" +
                "╚═══════════════════════════════════════════════════════════════╝\n");
    }
}
