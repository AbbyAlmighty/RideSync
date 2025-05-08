package com.example.carpool.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.carpool.entity.CustomUserDetails;
import com.example.carpool.entity.User;
import com.example.carpool.repository.UserRepository;

@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService {
	@Autowired
    private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(email)
				.orElseThrow(() -> new UsernameNotFoundException("Invalid Email ID"));
		return new CustomUserDetails(user);
	}

}