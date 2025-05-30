package com.forum.model.user.vo;

import java.time.LocalDateTime;
import java.util.List;

public class AnswerListVO {
    private class AnswerItem{
        private String questionId;
        private String description;
        private String type;
        private String options;
        private String answer;
        private Integer score;
    }
    private LocalDateTime submitTime;
    private Integer totalScore;
    private List<AnswerItem> answers;
}
