package in.smcoder.cybercode.service.impl;

import in.smcoder.cybercode.entity.Submission;
import in.smcoder.cybercode.repository.SubmissionRepository;
import in.smcoder.cybercode.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SubmissionServiceImpl implements SubmissionService {

    private final SubmissionRepository submissionRepository;

    @Autowired
    public SubmissionServiceImpl(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    @Override
    public Submission createSubmission(Submission submission) {
        return submissionRepository.save(submission);
    }

    @Override
    public Optional<Submission> getSubmissionById(Long id) {
        return submissionRepository.findById(id);
    }

    @Override
    public List<Submission> getSubmissionsByUserId(String userId) {
        return submissionRepository.findAll()
                .stream()
                .filter(sub -> sub.getUser().getId().equals(userId))
                .toList();
    }
}
