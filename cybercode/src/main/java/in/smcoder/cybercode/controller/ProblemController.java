package in.smcoder.cybercode.controller;

import in.smcoder.cybercode.dto.ProblemListDto;
import in.smcoder.cybercode.entity.Problem;
import in.smcoder.cybercode.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/problems")
public class ProblemController {

    private final ProblemService problemService;

    @Autowired
    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @PostMapping("/create")
    public ResponseEntity<Problem> createProblem(@RequestBody Problem problem) {
        Problem createdProblem = problemService.createProblem(problem);
        return new ResponseEntity<>(createdProblem, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProblemListDto>> getAllProblems() {
        List<Problem> problems = problemService.getAllProblems();

        List<ProblemListDto> filteredProblems = new ArrayList<>();
        for (Problem problem : problems) {
            ProblemListDto tempProblem = new ProblemListDto();
            tempProblem.setId(problem.getId());
            tempProblem.setTitle(problem.getTitle());
            tempProblem.setDifficulty(problem.getDifficulty());

            filteredProblems.add(tempProblem);
        }

        return ResponseEntity.ok(filteredProblems);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Problem> getProblemById(@PathVariable Long id) {
        Optional<Problem> problem = problemService.getProblemById(id);
        return problem.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/tag/{tagId}")
    public ResponseEntity<List<Problem>> getProblemsByTag(@PathVariable String tagName) {
        List<Problem> problems = problemService.getProblemsByTagName(tagName);
        return ResponseEntity.ok(problems);
    }

    @GetMapping("/company/{companyName}")
    public ResponseEntity<List<Problem>> getProblemsByCompany(@PathVariable String companyName) {
        List<Problem> problems = problemService.getProblemsByCompanyName(companyName);
        return ResponseEntity.ok(problems);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProblem(@PathVariable Long id) {
        problemService.deleteProblem(id);
        return ResponseEntity.noContent().build();
    }
}