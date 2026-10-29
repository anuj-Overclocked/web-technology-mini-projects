package com.vit.result.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "subject_result")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubjectResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String subjectName;

    @Column(nullable = false)
    private Integer mse;  // Out of 30

    @Column(nullable = false)
    private Integer ese;  // Out of 70

    @Column(nullable = false)
    private Integer total;  // MSE + ESE = Out of 100

    @Column(nullable = false)
    private String grade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "semester_result_id", nullable = false)
    private SemesterResult semesterResult;

}
