package in.smcoder.cybercode.controller;

import in.smcoder.cybercode.entity.User;
import in.smcoder.cybercode.repository.UserRepository;
import in.smcoder.cybercode.utils.JwtTokenUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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
    public void login(@RequestParam(name = "username") String username,
                      @RequestParam(name = "password") String password,
                      HttpServletResponse response) {

        this.doAuthenticate(username, password);

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        String token = jwtTokenUtil.generateToken(userDetails);

        // Create Cookie
        // JwtToken
        Cookie jwtCookie = new Cookie("auth_Token", token);
        jwtCookie.setHttpOnly(false);
        jwtCookie.setSecure(false);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(7 * 24 * 60 * 60);  // 7 Days
        response.addCookie(jwtCookie);

        // User ID
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User name not found with username: " + userDetails.getUsername()));
        Cookie userIdCookie = new Cookie("user_id", user.getId());
        userIdCookie.setHttpOnly(false);
        userIdCookie.setSecure(false);
        userIdCookie.setPath("/");
        userIdCookie.setMaxAge(7 * 24 * 60 * 60);  // 7 Days
        response.addCookie(userIdCookie);

        response.setStatus(HttpStatus.OK.value());
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
