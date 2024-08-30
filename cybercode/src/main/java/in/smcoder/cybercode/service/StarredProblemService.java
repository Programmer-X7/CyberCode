package in.smcoder.cybercode.service;

import in.smcoder.cybercode.dto.ProblemListDto;

import java.util.List;

public interface StarredProblemService {
    void starProblem(String userId, Long problemId);

    void unstarProblem(String userId, Long problemId);

    boolean hasUserStarredProblem(String userId, Long problemId);

    List<ProblemListDto> getAllStarredProblemsByUserId(String userId);
}
