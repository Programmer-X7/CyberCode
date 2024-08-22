package in.smcoder.cybercode.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private String name;
    private String profileImage;
    private boolean active;
    private String role;

    @Column(name = "create_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    // Pre-persist method to generate ID and set createdAt
    @PrePersist
    public void prePersist() {
        this.id = generateCustomId();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    // Pre-update method to set updatedAt
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = new Date();
    }

    // Method to generate custom ID
    private String generateCustomId() {
        long millis = System.currentTimeMillis();
        String randomUUID = UUID.randomUUID().toString()
                .replace("-", "").substring(0, 5);
        return millis + randomUUID;
    }
}
