package in.smcoder.cybercode.controller;

import in.smcoder.cybercode.dto.LoginRequestDto;
import in.smcoder.cybercode.dto.LoginResponseDto;
import in.smcoder.cybercode.entity.User;
import in.smcoder.cybercode.repository.UserRepository;
import in.smcoder.cybercode.utils.JwtTokenUtil;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserRepository userRepository;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, JwtTokenUtil jwtTokenUtil, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto dto) {

        this.doAuthenticate(dto.getUsername(), dto.getPassword());

        UserDetails userDetails = userDetailsService.loadUserByUsername(dto.getUsername());

        // Fetch user Details
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User name not found with username: " + userDetails.getUsername()));

        // Generate Jwt Token
        String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new LoginResponseDto(user, token));
    }

    private void doAuthenticate(String username, String password) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        try {
            authenticationManager.authenticate(authenticationToken);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Credentials Invalid!! Source-From: " + this.getClass().getSimpleName());
        }
    }
}
