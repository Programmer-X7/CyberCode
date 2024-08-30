package in.smcoder.cybercode.controller;

import in.smcoder.cybercode.dto.ProblemListDto;
import in.smcoder.cybercode.service.StarredProblemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/starred-problems")
public class StarredProblemController {

    private final StarredProblemService starredProblemService;

    public StarredProblemController(StarredProblemService starredProblemService) {
        this.starredProblemService = starredProblemService;
    }

    // Endpoint to star a problem
    @PostMapping("/star")
    public ResponseEntity<String> starProblem(@RequestParam String userId, @RequestParam Long problemId) {
        starredProblemService.starProblem(userId, problemId);
        return ResponseEntity.ok("Problem starred successfully.");
    }

    // Endpoint to unstar a problem
    @DeleteMapping("/unstar")
    public ResponseEntity<String> unstarProblem(@RequestParam String userId, @RequestParam Long problemId) {
        starredProblemService.unstarProblem(userId, problemId);
        return ResponseEntity.ok("Problem un-starred successfully.");
    }

    // Endpoint to get all starred problems for a user
    @GetMapping("/{userId}")
    public ResponseEntity<List<ProblemListDto>> getAllStarredProblems(@PathVariable String userId) {
        List<ProblemListDto> starredProblems = starredProblemService.getAllStarredProblemsByUserId(userId);
        return ResponseEntity.ok(starredProblems);
    }

    // Endpoint to check a problem is stared or not
    @GetMapping("/has-starred")
    public ResponseEntity<Boolean> hasUserStarredProblem(
            @RequestParam(value = "userId") String userId,
            @RequestParam(value = "problemId") Long problemId) {
        boolean hasStarred = starredProblemService.hasUserStarredProblem(userId, problemId);
        return ResponseEntity.ok(hasStarred);
    }
}


