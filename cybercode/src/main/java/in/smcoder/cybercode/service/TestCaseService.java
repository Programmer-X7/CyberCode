package in.smcoder.cybercode.service;

import in.smcoder.cybercode.entity.Problem;
import in.smcoder.cybercode.entity.TestCase;

import java.util.List;
import java.util.Optional;

public interface TestCaseService {

    TestCase createTestCase(TestCase testCase);

    List<TestCase> getAllTestCases();

    Optional<TestCase> getTestCaseById(Long id);

    List<TestCase> getTestCasesByProblemId(Long problemId);

    void deleteTestCase(Long id);

}
