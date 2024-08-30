package in.smcoder.cybercode.controller;

import in.smcoder.cybercode.entity.Note;
import in.smcoder.cybercode.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("/save")
    public ResponseEntity<Note> saveNote(@RequestBody Note note) {
        Note saved = noteService.saveOrUpdateNote(note);
        return ResponseEntity.ok(saved);
    }

//    @PostMapping("/create")
//    public ResponseEntity<Note> createNote(@RequestBody Note note) {
//        Note savedNote = noteService.createNote(note);
//        return new ResponseEntity<>(savedNote, HttpStatus.CREATED);
//    }
//
//    @PutMapping("/{noteId}")
//    public ResponseEntity<Note> updateNote(@PathVariable Long noteId, @RequestBody String content) {
//        Note updatedNote = noteService.updateNote(noteId, content);
//        return ResponseEntity.ok(updatedNote);
//    }

    @GetMapping
    public ResponseEntity<Note> getNote(@RequestParam(name = "userId") String userId,
                                        @RequestParam(name = "problemId") Long problemId) {
        Note note = noteService.findNote(userId, problemId);

        if (note == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(note);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteNote(@RequestParam String userId,
                                           @RequestParam Long problemId) {
        noteService.deleteNote(userId, problemId);
        return ResponseEntity.noContent().build();
    }
}
