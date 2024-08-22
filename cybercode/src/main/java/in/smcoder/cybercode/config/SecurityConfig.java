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

                        .requestMatchers("/api/auth/**").permitAll()

                        .requestMatchers("/api/public/**").permitAll()
                        .requestMatchers("/api/private/**").hasAnyRole("CODER", "ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/users/create-coder").permitAll()  // Create Coder
                        .requestMatchers(HttpMethod.POST, "/api/users/create-admin").hasRole("ADMIN")  // Create Admin
                        .requestMatchers(HttpMethod.GET, "/api/users/all").hasRole("ADMIN") // Get All Users
                        .requestMatchers(HttpMethod.GET, "/api/users/**").hasAnyRole("CODER", "ADMIN")  // Get User Details
                        .requestMatchers(HttpMethod.PUT, "/api/users/update-details").hasAnyRole("CODER", "ADMIN")  // Update User Basic Details
                        .requestMatchers(HttpMethod.PUT, "/api/users/update-password").hasAnyRole("CODER", "ADMIN") // Update User Password
                        .requestMatchers(HttpMethod.PUT, "/api/users/update-status").hasRole("ADMIN")   // Update User Status
                        .requestMatchers(HttpMethod.DELETE, "/api/users/**").hasAnyRole("CODER", "ADMIN")   // Delete User

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
