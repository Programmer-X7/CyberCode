package in.smcoder.cybercode.service.impl;

import in.smcoder.cybercode.entity.Tag;
import in.smcoder.cybercode.repository.TagRepository;
import in.smcoder.cybercode.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Autowired
    public TagServiceImpl(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Override
    public Tag createProblemTag(Tag tag) {
        return tagRepository.save(tag);
    }

    @Override
    public List<Tag> getAllProblemTags() {
        return tagRepository.findAll();
    }

    @Override
    public void deleteProblemTag(Long id) {
        tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No tag found with id: " + id));
        tagRepository.deleteById(id);
    }
}
