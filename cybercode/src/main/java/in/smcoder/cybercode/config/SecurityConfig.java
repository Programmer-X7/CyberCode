package in.smcoder.cybercode.config;

import in.smcoder.cybercode.security.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomAuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,
                          CustomAuthenticationEntryPoint authenticationEntryPoint) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth

                                // Authentication Endpoints
                                .requestMatchers("/api/auth/**").permitAll()    // Authentication: Login

                                // User Endpoints
                                .requestMatchers(HttpMethod.POST, "/api/users/create-coder").permitAll()  // Create Coder
                                .requestMatchers(HttpMethod.POST, "/api/users/create-admin").hasRole("ADMIN")  // Create Admin
                                .requestMatchers(HttpMethod.GET, "/api/users/all").hasRole("ADMIN") // Get All Users
                                .requestMatchers(HttpMethod.GET, "/api/users/**").hasAnyRole("CODER", "ADMIN")  // Get User Details
                                .requestMatchers(HttpMethod.PUT, "/api/users/update-details").hasAnyRole("CODER", "ADMIN")  // Update User Basic Details
                                .requestMatchers(HttpMethod.PUT, "/api/users/update-password").hasAnyRole("CODER", "ADMIN") // Update User Password
                                .requestMatchers(HttpMethod.PUT, "/api/users/update-status").hasRole("ADMIN")   // Update User Status
                                .requestMatchers(HttpMethod.DELETE, "/api/users/**").hasAnyRole("CODER", "ADMIN")   // Delete User

                                // Problem Endpoints
                                .requestMatchers(HttpMethod.POST, "/api/problems/create").hasRole("ADMIN")  // Create Problem
                                .requestMatchers(HttpMethod.GET, "/api/problems/all").permitAll()   // Get All Problems
                                .requestMatchers(HttpMethod.GET, "/api/problems/**").permitAll()    // Get Problem Details
                                .requestMatchers(HttpMethod.GET, "/api/problems/tag/**").permitAll()    // Get Problem Details
                                .requestMatchers(HttpMethod.GET, "/api/problems/company/**").permitAll()    // Get Problem Details
                                .requestMatchers(HttpMethod.DELETE, "/api/problems/**").hasRole("ADMIN") // Delete Problem

                                // Tag Endpoints
                                .requestMatchers(HttpMethod.POST, "/api/tags/create").hasRole("ADMIN")  // Create Tag
                                .requestMatchers(HttpMethod.GET, "/api/tags/all").permitAll()   // Get All tags
                                .requestMatchers(HttpMethod.DELETE, "/api/tags/**").hasRole("ADMIN")    // Delete Tag

                                // Company Endpoints
                                .requestMatchers(HttpMethod.POST, "/api/companies/create").hasRole("ADMIN") // Create company
                                .requestMatchers(HttpMethod.GET, "/api/companies/all").permitAll()  // Get all companies
                                .requestMatchers(HttpMethod.DELETE, "/api/companies/**").hasRole("ADMIN")  // DeleteCompany

                                // Note Endpoints
                                .requestMatchers(HttpMethod.POST, "/api/notes/save").hasRole("CODER")   // Save or Update Note
                                .requestMatchers(HttpMethod.GET, "/api/notes").hasRole("CODER") // Get Note
                                .requestMatchers(HttpMethod.DELETE, "/api/notes/delete").hasRole("CODER")   // Delete Note

                                // Star/Save Problem Endpoint
                                .requestMatchers(HttpMethod.POST, "/api/starred-problems/star").hasRole("CODER")    // Star Problem
                                .requestMatchers(HttpMethod.DELETE, "/api/starred-problems/unstar").hasRole("CODER")    // Unstar Problem
                                .requestMatchers(HttpMethod.GET, "/api/starred-problems/**").hasRole("CODER")   // Get All Starred Problems by User
                                .requestMatchers(HttpMethod.GET, "/api/starred-problems/has-starred").hasRole("CODER") // Is starred problem by User

                                .anyRequest().authenticated()
                )
                .exceptionHandling(ex -> ex.authenticationEntryPoint(authenticationEntryPoint))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
