package com.example.carpool.dto;

import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthRequest {

	@NotEmpty(message = "Username cannot be empty")
	private String username;

	@NotEmpty(message = "Password cannot be empty")
	private String password;
}
