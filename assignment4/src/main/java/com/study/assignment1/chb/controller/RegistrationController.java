package com.study.assignment1.chb.controller;

import com.study.assignment1.chb.entity.User;
import com.study.assignment1.chb.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RegistrationController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/signUp")
    public User signUp(@RequestBody Map<String,String> user) {
        return userRepository.save(User.builder()
                .username(user.get("username"))
                .password(passwordEncoder.encode(user.get("password")))
                .age(Integer.parseInt(user.get("age")))
                .description(user.get("description"))
                .build());
    }

}
