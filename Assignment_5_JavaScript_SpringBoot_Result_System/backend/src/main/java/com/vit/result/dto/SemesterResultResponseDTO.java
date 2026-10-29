package com.vit.result.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SemesterResultResponseDTO {
    private Long id;
    private String studentName;
    private String prn;
    private String division;
    private List<SubjectDTO> subjects;
    private Integer totalMarks;
    private Double percentage;
    private String resultStatus;
    private LocalDateTime createdAt;
}
