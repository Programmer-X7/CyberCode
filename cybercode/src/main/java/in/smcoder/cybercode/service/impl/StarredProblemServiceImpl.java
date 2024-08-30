package in.smcoder.cybercode.service.impl;

import in.smcoder.cybercode.dto.ProblemListDto;
import in.smcoder.cybercode.entity.Problem;
import in.smcoder.cybercode.entity.StarredProblem;
import in.smcoder.cybercode.entity.StarredProblemId;
import in.smcoder.cybercode.entity.User;
import in.smcoder.cybercode.mapper.ProblemListDtoMapper;
import in.smcoder.cybercode.repository.ProblemRepository;
import in.smcoder.cybercode.repository.StarredProblemRepository;
import in.smcoder.cybercode.repository.UserRepository;
import in.smcoder.cybercode.service.StarredProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class StarredProblemServiceImpl implements StarredProblemService {

    private final StarredProblemRepository starredProblemRepository;
    private final UserRepository userRepository;
    private final ProblemRepository problemRepository;
    private final ProblemListDtoMapper problemListDtoMapper;

    public StarredProblemServiceImpl(StarredProblemRepository starredProblemRepository, UserRepository userRepository, ProblemRepository problemRepository, ProblemListDtoMapper problemListDtoMapper) {
        this.starredProblemRepository = starredProblemRepository;
        this.userRepository = userRepository;
        this.problemRepository = problemRepository;
        this.problemListDtoMapper = problemListDtoMapper;
    }

    @Override
    public void starProblem(String userId, Long problemId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException(("User not found with id: " + userId)));

        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(() -> new RuntimeException("Problem not found with id: " + problemId));

        StarredProblemId id = new StarredProblemId(userId, problemId);
        if (!starredProblemRepository.existsById(id)) {
            StarredProblem starredProblem = new StarredProblem();
            starredProblem.setId(id);
            starredProblem.setUser(user);
            starredProblem.setProblem(problem);
            starredProblemRepository.save(starredProblem);
        }
    }

    @Override
    public void unstarProblem(String userId, Long problemId) {
        StarredProblemId id = new StarredProblemId(userId, problemId);
        if (starredProblemRepository.existsById(id)) {
            starredProblemRepository.deleteById(id);
        }
    }

    @Override
    public boolean hasUserStarredProblem(String userId, Long problemId) {
        return starredProblemRepository.existsByUserIdAndProblemId(userId, problemId);
    }

    @Override
    public List<ProblemListDto> getAllStarredProblemsByUserId(String userId) {
        return starredProblemRepository.findByUserId(userId)
                .stream()
                .map(starredProblem -> problemListDtoMapper.toProblemListDto(starredProblem.getProblem()))
                .collect(Collectors.toList());
    }
}
