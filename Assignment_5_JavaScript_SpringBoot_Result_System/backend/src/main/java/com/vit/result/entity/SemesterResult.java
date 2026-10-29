package com.vit.result.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "semester_result")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SemesterResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String studentName;

    @Column(nullable = false, unique = false)
    private String prn;

    @Column(nullable = false)
    private String division;

    @OneToMany(mappedBy = "semesterResult", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<SubjectResult> subjects;

    @Column(nullable = false)
    private Integer totalMarks;  // Out of 400

    @Column(nullable = false)
    private Double percentage;

    @Column(nullable = false)
    private String resultStatus;  // PASS or FAIL

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

}
