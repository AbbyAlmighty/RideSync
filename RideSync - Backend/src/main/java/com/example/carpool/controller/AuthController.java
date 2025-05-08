package com.example.carpool.controller;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.carpool.dto.AuthRequest;
import com.example.carpool.dto.AuthResponse;
import com.example.carpool.dto.UserResponse;
import com.example.carpool.entity.Role;
import com.example.carpool.entity.User;
import com.example.carpool.security.JwtUtil;
import com.example.carpool.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
   	private ModelMapper mapper;

    // ✅ Register a new user
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid AuthRequest authRequest) {
        User user = new User();
        user.setUsername(authRequest.getUsername());
        user.setPassword(passwordEncoder.encode(authRequest.getPassword()));
        user.setRole(Role.USER);
        userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // ✅ User login and JWT token generation
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getUsername(),
                        authRequest.getPassword()
                )
        );

        String username = authentication.getName();
        String token = jwtUtil.generateToken(username);

        return ResponseEntity.ok(new AuthResponse(token));
    }

    // ✅ Get authenticated user details using Spring Security context
    @GetMapping("/user")
    public ResponseEntity<UserResponse> getUserDetails() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserResponse userResponse = mapper.map(user, UserResponse.class);

        return ResponseEntity.ok(userResponse);
    }
}
