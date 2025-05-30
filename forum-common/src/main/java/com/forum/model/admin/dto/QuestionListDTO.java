package com.forum.model.admin.dto;

import java.util.List;

public class QuestionListDTO {
    private class QuestionItem {
        private Long questionId;
        private String description;
        private String type;
        private String options;
    }
    private List<QuestionItem> questions;

    //这是录入问题使用的表单
}
