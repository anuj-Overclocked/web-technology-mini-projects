package com.vit.result.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SemesterResultDTO {
    private String studentName;
    private String prn;
    private String division;
    private List<SubjectDTO> subjects;
    private Integer totalMarks;
    private String percentage;
    private String resultStatus;
}
