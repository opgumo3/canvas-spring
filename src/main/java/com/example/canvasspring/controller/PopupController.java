package com.example.canvasspring.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Slf4j
public class PopupController {

    @GetMapping("/popup")
    public String canvasPopup() {
        log.info("helllo?");
        return "popup";
    }
}
