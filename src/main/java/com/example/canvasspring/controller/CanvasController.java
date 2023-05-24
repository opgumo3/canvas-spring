package com.example.canvasspring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/canvas")
public class CanvasController {

    @GetMapping
    public String CanvasPage() {
        return "canvas";
    }

}
