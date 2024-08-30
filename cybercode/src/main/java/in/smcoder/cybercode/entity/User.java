package in.smcoder.cybercode.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String profileImage;

    @Column(nullable = false)
    private boolean active;

    @Column(nullable = false)
    private String role;

    @Column(name = "create_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Generate ID and set createdAt before save
    @PrePersist
    public void prePersist() {
        this.id = generateCustomId();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // set updatedAt before update
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Method to generate custom ID
    private String generateCustomId() {
        long millis = System.currentTimeMillis();
        String randomUUID = UUID.randomUUID().toString()
                .replace("-", "").substring(0, 5);
        return millis + randomUUID;
    }
}
