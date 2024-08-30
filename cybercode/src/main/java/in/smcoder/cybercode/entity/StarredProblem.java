package in.smcoder.cybercode.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "starred_problems")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StarredProblem {
    @EmbeddedId
    private StarredProblemId id = new StarredProblemId();

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("problemId")
    @JoinColumn(name = "problem_id")
    private Problem problem;
}
