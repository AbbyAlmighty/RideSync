package com.example.carpool.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserResponse {

	private Long id;
	private String username;
	private String firstName;
	private String lastName;
	private Long mobileNumber;
}
