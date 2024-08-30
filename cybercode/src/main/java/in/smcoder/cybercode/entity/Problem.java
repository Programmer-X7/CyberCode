package in.smcoder.cybercode.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "problems")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String difficulty;

    @Column(name = "expected_space_complexity", nullable = false)
    private String expectedTimeComplexity;

    @Column(name = "expected_time_complexity", nullable = false)
    private String expectedSpaceComplexity;

    @ElementCollection
    @CollectionTable(name = "problem_constraints", joinColumns = @JoinColumn(name = "problem_id", referencedColumnName = "id"))
    @Column(name = "constraints", columnDefinition = "TEXT")
    private Set<String> constraints;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "problems_tags",
            joinColumns = @JoinColumn(name = "problem_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id")
    )
    @JsonIgnoreProperties("problems")
    private Set<Tag> tags;

    @ElementCollection
    @CollectionTable(name = "problem_examples", joinColumns = @JoinColumn(name = "problem_id", referencedColumnName = "id"))
    @Column(name = "example", columnDefinition = "TEXT")
    private Set<String> examples;

    @Column(nullable = true, columnDefinition = "TEXT")
    private String image;

    @ElementCollection
    @CollectionTable(name = "problem_hints", joinColumns = @JoinColumn(name = "problem_id", referencedColumnName = "id"))
    @Column(name = "hint", columnDefinition = "TEXT")
    private Set<String> hints;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "problems_companies",
            joinColumns = @JoinColumn(name = "problem_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "company_id", referencedColumnName = "id")
    )
    @JsonIgnoreProperties("problems")
    private Set<Company> companies;

    @ElementCollection
    @CollectionTable(name = "problem_boilerplate_code", joinColumns = @JoinColumn(name = "problem_id", referencedColumnName = "id"))
    @MapKeyColumn(name = "language")
    @Column(name = "boilerplate_code", columnDefinition = "TEXT")
    private Map<String, String> boilerplateCode;

    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TestCase> testCases;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}