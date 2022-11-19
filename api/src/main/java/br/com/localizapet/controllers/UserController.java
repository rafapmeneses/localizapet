package br.com.localizapet.controllers;

import br.com.localizapet.service.UserService;
import br.com.localizapet.payload.request.UserRequest;
import br.com.localizapet.payload.response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping()
    public UserResponse getLoggedUser() {
        return userService.getLoggedUser();
    }

    @GetMapping("/{userId}")
    public UserResponse getBasicUser(@PathVariable String userId) {
        return userService.getBasicUser(userId);
    }

    @GetMapping("/full/{userId}")
    public UserResponse getFullUser(@PathVariable String userId) {
        return userService.getFullUser(userId);
    }

    @PutMapping()
    public void updateUser(@Valid @RequestBody UserRequest userRequest) {
        userService.updateUser(userRequest);
    }
}
