package in.smcoder.cybercode.controller;

import in.smcoder.cybercode.entity.Tag;
import in.smcoder.cybercode.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    private final TagService tagService;

    @Autowired
    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @PostMapping("/create")
    public ResponseEntity<Tag> createTag(Tag tag) {
        Tag savedTag = tagService.createProblemTag(tag);
        return new ResponseEntity<>(savedTag, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Tag>> getAllTags() {
        List<Tag> tags = tagService.getAllProblemTags();
        return ResponseEntity.ok(tags);
    }

    @DeleteMapping("/{tagId}")
    public ResponseEntity<Void> deleteTag(@PathVariable Long tagId) {
        tagService.deleteProblemTag(tagId);
        return ResponseEntity.noContent().build();
    }
}
