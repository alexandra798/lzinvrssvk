package com.forum.model.user.vo;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PostItemVO {

    private String title;

    private Integer commentCount;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


}

