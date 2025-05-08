package com.example.carpool.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.carpool.service.CustomUserDetailsService;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        String username = null;
        String token = null;

        // If the Authorization header starts with "Bearer"
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7); // Extract the token
            username = jwtUtil.extractUsername(token); // Extract username from the token
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            var userDetails = userDetailsService.loadUserByUsername(username); // Get user details from the database

            if (jwtUtil.validateToken(token, userDetails.getUsername())) { // Validate the token
                UsernamePasswordAuthenticationToken authToken = 
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken); // Set authentication in the context
            }
        }

        chain.doFilter(request, response); // Proceed to the next filter
    }
}
