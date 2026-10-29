package com.vit.result.repository;

import com.vit.result.entity.SemesterResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SemesterResultRepository extends JpaRepository<SemesterResult, Long> {
    List<SemesterResult> findByStudentName(String studentName);
    List<SemesterResult> findByPrn(String prn);
    Optional<SemesterResult> findById(Long id);
}
