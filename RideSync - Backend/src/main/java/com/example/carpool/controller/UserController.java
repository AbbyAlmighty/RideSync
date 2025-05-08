package com.example.carpool.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.carpool.dto.UserResponse;
import com.example.carpool.entity.User;
import com.example.carpool.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private ModelMapper mapper;

	// Get user details by authenticated username
	@GetMapping("/details")
	public ResponseEntity<UserResponse> getUserDetails() {
		String username = getCurrentUsername();
		User user = userService.getUserByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
		UserResponse userResponse = mapper.map(user, UserResponse.class);
		System.out.println(userResponse);
		return ResponseEntity.ok(userResponse);
	}

	// Update user details (e.g., change password, etc.)
	@PutMapping("/update")
	public ResponseEntity<String> updateUserDetails(@RequestBody UserResponse updatedUser) {
		String username = getCurrentUsername();
		User user = userService.getUserByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

		// You may want to encode this!
		user.setFirstName(updatedUser.getFirstName());
		user.setLastName(updatedUser.getLastName());
		user.setMobileNumber(updatedUser.getMobileNumber());
		userService.saveUser(user);
		return ResponseEntity.ok("User details updated successfully");
	}

	private String getCurrentUsername() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return authentication.getName(); // returns the username from the JWT
	}
}
