package com.ticketBox.controller;

import com.ticketBox.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    @PostMapping("/register")
    public ResponseEntity<User> create(@Validated @RequestBody User user) {



//        ResponseEntity<User> ticketResponseEntity = userService.createTicket(ticket);

        return null;
    }

}
