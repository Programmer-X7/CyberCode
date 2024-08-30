package in.smcoder.cybercode.repository;

import in.smcoder.cybercode.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    // Query to find a Note by Problem ID and User ID
    @Query("SELECT n FROM Note n WHERE n.userId = :userId AND n.problemId = :problemId")
    Optional<Note> findByProblemAndUser(@Param("userId") String userId, @Param("problemId") Long problemId);
}
