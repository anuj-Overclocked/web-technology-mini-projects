package com.vit.result.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubjectDTO {
    private String subjectName;
    private Integer mse;
    private Integer ese;
    private Integer total;
    private String grade;
}
