package in.smcoder.cybercode.service.impl;

import in.smcoder.cybercode.entity.Company;
import in.smcoder.cybercode.entity.Problem;
import in.smcoder.cybercode.entity.Tag;
import in.smcoder.cybercode.entity.TestCase;
import in.smcoder.cybercode.repository.CompanyRepository;
import in.smcoder.cybercode.repository.ProblemRepository;
import in.smcoder.cybercode.repository.TagRepository;
import in.smcoder.cybercode.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class ProblemServiceImpl implements ProblemService {

    private final ProblemRepository problemRepository;
    private final TagRepository tagRepository;
    private final CompanyRepository companyRepository;

    @Autowired
    public ProblemServiceImpl(ProblemRepository problemRepository, TagRepository tagRepository, CompanyRepository companyRepository) {
        this.problemRepository = problemRepository;
        this.tagRepository = tagRepository;
        this.companyRepository = companyRepository;
    }

    @Override
    public Problem createProblem(Problem problem) {
        // Set Tags to problem
        Set<Tag> processedTags = new HashSet<>();
        for (Tag tag : problem.getTags()) {
            Optional<Tag> existingTag = tagRepository.findByName(tag.getName());
            if (existingTag.isPresent()) {
                processedTags.add(existingTag.get());
            } else {
                processedTags.add(tagRepository.save(tag));
            }
        }
        problem.setTags(processedTags);

        // Set Companies to problem
        Set<Company> processedCompanies = new HashSet<>();
        for (Company company : problem.getCompanies()) {
            Optional<Company> existingCompany = companyRepository.findByName(company.getName());
            if (existingCompany.isPresent()) {
                processedCompanies.add(existingCompany.get());
            } else {
                processedCompanies.add(companyRepository.save(company));
            }
        }
        problem.setCompanies(processedCompanies);

        // Set Testcases to problem
        for (TestCase testCase: problem.getTestCases()) {
            testCase.setProblem(problem);
        }

        return problemRepository.save(problem);
    }

    @Override
    public List<Problem> getAllProblems() {
        return problemRepository.findAll();
    }

    @Override
    public Optional<Problem> getProblemById(Long id) {
        return problemRepository.findById(id);
    }

    @Override
    public List<Problem> getProblemsByTagName(String tagName) {
        Tag tag = tagRepository.findByName(tagName)
                .orElseThrow(() -> new RuntimeException("Tag not found with name: " + tagName));
        return List.copyOf(tag.getProblems());
    }

    @Override
    public List<Problem> getProblemsByCompanyName(String companyName) {
        Company company = companyRepository.findByName(companyName)
                .orElseThrow(() -> new RuntimeException("Company not found with name: " + companyName));
        return List.copyOf(company.getProblems());
    }

    @Override
    public Problem updateProblem(Long id, Problem problem) {
        // Todo: Update Logic Here
        return null;
    }

    @Override
    public void deleteProblem(Long id) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No problem found with id: " + id));

        // Remove the association with tags
        for (Tag tag : problem.getTags()) {
            tag.getProblems().remove(problem);
        }

        // Clear the tags set in the problem to avoid constraint issues
        problem.getTags().clear();

        // Now delete the problem
        problemRepository.delete(problem);
    }
}
