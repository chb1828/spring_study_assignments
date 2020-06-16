package com.study.assignment1.chb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class LoginController {

    @RequestMapping(method = {RequestMethod.POST,RequestMethod.GET},value = "/login")
    public String login() {
        return "login";
    }

}
