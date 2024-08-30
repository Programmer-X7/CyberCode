package in.smcoder.cybercode.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class StarredProblemId implements Serializable {

    private String userId;
    private Long problemId;
}
