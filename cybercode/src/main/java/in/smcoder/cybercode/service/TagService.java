package in.smcoder.cybercode.service;

import in.smcoder.cybercode.entity.Tag;

import java.util.List;

public interface TagService {
    Tag createProblemTag(Tag tag);

    List<Tag> getAllProblemTags();

    void deleteProblemTag(Long id);
}
