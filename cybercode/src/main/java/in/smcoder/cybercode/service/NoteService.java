package in.smcoder.cybercode.service;

import in.smcoder.cybercode.entity.Note;

public interface NoteService {
    Note saveOrUpdateNote(Note note);
    Note findNote(String userId, Long problemId);
    void deleteNote(String userId, Long problemId);
}
