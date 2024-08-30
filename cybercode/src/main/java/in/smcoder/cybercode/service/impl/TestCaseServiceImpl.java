package in.smcoder.cybercode.service.impl;

import in.smcoder.cybercode.entity.TestCase;
import in.smcoder.cybercode.repository.TestCaseRepository;
import in.smcoder.cybercode.service.TestCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TestCaseServiceImpl implements TestCaseService {

    private final TestCaseRepository testCaseRepository;

    @Autowired
    public TestCaseServiceImpl(TestCaseRepository testCaseRepository) {
        this.testCaseRepository = testCaseRepository;
    }

    @Override
    public TestCase createTestCase(TestCase testCase) {
        return testCaseRepository.save(testCase);
    }

    @Override
    public List<TestCase> getAllTestCases() {
        return testCaseRepository.findAll();
    }

    @Override
    public Optional<TestCase> getTestCaseById(Long id) {
        return testCaseRepository.findById(id);
    }

    @Override
    public List<TestCase> getTestCasesByProblemId(Long problemId) {
        return testCaseRepository.findAll()
                .stream()
                .filter(tc -> tc.getProblem().getId().equals(problemId))
                .toList();
    }

    @Override
    public void deleteTestCase(Long id) {
        testCaseRepository.deleteById(id);
    }
}
