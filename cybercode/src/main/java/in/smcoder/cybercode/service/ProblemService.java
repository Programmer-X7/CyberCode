package in.smcoder.cybercode.service;

import in.smcoder.cybercode.entity.Problem;
import in.smcoder.cybercode.entity.TestCase;

import java.util.List;
import java.util.Optional;

public interface ProblemService {
    Problem createProblem(Problem problem);

    List<Problem> getAllProblems();

    Optional<Problem> getProblemById(Long id);

    List<Problem> getProblemsByTagName(String tagName);

    List<Problem> getProblemsByCompanyName(String companyName);

    Problem updateProblem(Long id, Problem problem);

    void deleteProblem(Long id);
}
