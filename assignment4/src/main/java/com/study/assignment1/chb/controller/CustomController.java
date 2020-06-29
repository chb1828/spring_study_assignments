package com.study.assignment1.chb.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CustomController implements ErrorController {

    @RequestMapping({"/,/error"})
    public String handleError() {
        return "/index.html";
    }
    @Override
    public String getErrorPath() {
        return "/error";
    }
}
