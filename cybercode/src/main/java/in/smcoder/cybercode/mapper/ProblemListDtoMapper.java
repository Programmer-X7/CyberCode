package in.smcoder.cybercode.mapper;

import in.smcoder.cybercode.dto.ProblemListDto;
import in.smcoder.cybercode.entity.Problem;
import org.springframework.stereotype.Component;

@Component
public class ProblemListDtoMapper {
    public ProblemListDto toProblemListDto(Problem problem) {
        ProblemListDto dto = new ProblemListDto();

        dto.setId(problem.getId());
        dto.setTitle(problem.getTitle());
        dto.setDifficulty(problem.getDifficulty());
        dto.setStatus("solved");

        return dto;
    }
}
