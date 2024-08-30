package in.smcoder.cybercode.service.impl;

import in.smcoder.cybercode.entity.Note;
import in.smcoder.cybercode.repository.NoteRepository;
import in.smcoder.cybercode.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;

    @Autowired
    public NoteServiceImpl(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @Override
    public Note saveOrUpdateNote(Note note) {
        Note existingNote = noteRepository.findByProblemAndUser(note.getUserId(), note.getProblemId()).orElse(null);

        if (existingNote == null) {
            return noteRepository.save(note);
        } else {
            existingNote.setContent(note.getContent());
            return noteRepository.save(existingNote);
        }
    }

    @Override
    public Note findNote(String userId, Long problemId) {
        return noteRepository.findByProblemAndUser(userId, problemId).orElse(null);
    }

    @Override
    public void deleteNote(String userId, Long problemId) {
        Note note = noteRepository.findByProblemAndUser(userId, problemId)
                .orElseThrow(() -> new RuntimeException("No note found with userId: " + userId + " & problemId: " + problemId));
        noteRepository.delete(note);
    }
}
