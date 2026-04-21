package com.college.placement;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class HashGen {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println("HASH_START:" + encoder.encode("siet@2026") + ":HASH_END");
    }
}
