package in.smcoder.cybercode.service;

import in.smcoder.cybercode.entity.Submission;

import java.util.List;
import java.util.Optional;

public interface SubmissionService {
    Submission createSubmission(Submission submission);

    Optional<Submission> getSubmissionById(Long id);

    List<Submission> getSubmissionsByUserId(String userId);
}
