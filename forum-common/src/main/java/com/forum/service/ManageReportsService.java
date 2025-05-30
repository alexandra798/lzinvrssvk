package com.forum.service;


import com.forum.model.entity.Report;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;

public interface ManageReportsService {
    List<Report> getReportedPostsByDate(@RequestParam Date startDate, @RequestParam Date endDate);
    List<Report> getReportedCommentsByDate(@RequestParam Date startDate, @RequestParam Date endDate);

    void hidePost(Long reportId);
    void hideComment(Long reportId);

    void ignorePost(Long reportId);
    void ignoreComment(Long reportId);

    void BanUserByPost(Long postId);
    void BanUserByComment(Long commentId);
}
//commentId应当是绝对id还是相对单个post的相对id？
//ignore的实现：忽略一条举报信息，而不是忽略针对一个帖子/评论的所有举报
//举报计数还是挺难实现的
