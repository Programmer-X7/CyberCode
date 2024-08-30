//package in.smcoder.cybercode.dto;
//
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import in.smcoder.cybercode.entity.Note;
//import in.smcoder.cybercode.entity.Tag;
//import in.smcoder.cybercode.entity.TestCase;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;
//import java.util.Set;
//
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class ProblemDetailsDto {
//
//    private Long id;
//    private String title;
//    private String description;
//    private String difficulty;
//    private String expectedTimeComplexity;
//    private String expectedSpaceComplexity;
//    private Set<String> constraints;
//    private Set<Tag> tags;
//    private Set<String> examples;
//    private String image;
//    private Set<String> hints;
//    private Map<String, String> boilerplateCode;
//    private Set<TestCase> testCases;
//    private LocalDateTime createdAt;
//    private LocalDateTime updatedAt;
//}
