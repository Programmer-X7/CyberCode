package in.smcoder.cybercode.repository;

import in.smcoder.cybercode.entity.StarredProblem;
import in.smcoder.cybercode.entity.StarredProblemId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StarredProblemRepository extends JpaRepository<StarredProblem, StarredProblemId> {

    List<StarredProblem> findByUserId(String userId);

    boolean existsByUserIdAndProblemId(String userId, Long problemId);
}

