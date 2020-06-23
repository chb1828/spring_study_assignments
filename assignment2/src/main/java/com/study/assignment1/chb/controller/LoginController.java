package com.study.assignment1.chb.controller;

import com.study.assignment1.chb.entity.User;
import com.study.assignment1.chb.repository.UserRepository;
import com.study.assignment1.chb.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@Controller
public class LoginController {

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @RequestMapping(method = {RequestMethod.POST,RequestMethod.GET},value = "/login")
    public String login(@RequestBody Map<String,String> user) {
        User member = userRepository.findByUsername(user.get("username"))
                .orElseThrow(()->new IllegalArgumentException("가입되지 않은 유저 입니다."));
        if(!passwordEncoder.matches(user.get("password"),member.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }
        return jwtTokenProvider.createToken(member.getUsername(),member.getRole());
    }

}
