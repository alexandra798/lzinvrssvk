package com.forum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/post/{postId}")
    public Result<PageResult<CommentVO>> getComments(
            @PathVariable Long postId,
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "20") Integer pageSize) {
        try {
            PageResult<CommentVO> comments = commentService.getCommentsByPost(postId, pageNum, pageSize);
            return Result.success(comments);
        } catch (BusinessException e) {
            return Result.error(e.getMessage());
        }
    }

    // 1.在postdetail页面点击评论编辑栏底下的“提交”键后触发：
    //补充功能：若评论编辑栏中有检测到活的“@xx”，那么在数据库中将这个帖子的replyTo属性设置为对应的楼层。
    @PostMapping("/api/posts/{postId}/comment")
    public Result<CommentVO> createComment(
            @PathVariable Long postId,
            @RequestBody CommentDTO commentDTO) {
        try {
            CommentVO comment = commentService.createComment(commentDTO);
            return Result.success(comment);
        } catch (BusinessException e) {
            return Result.error(e.getMessage());
        }
    }

    //2. 点击某条comment后的回复按钮后触发输入框中生成“回复xx楼”的按钮-纯前端功能


    //3. 点击某条comment右下角的“举报”按钮后所触发的
    @PostMapping("/api/posts/{postId}/comment-report/{commentId}")
    public Result<?> reportComment(@PathVariable Long id, @RequestBody ReportDTO reportDTO) {
        try {
            commentService.reportComment(postId, commentId);
            return Result.success();
        } catch (BusinessException e) {
            return Result.error(e.getMessage());
        }
    }

//4. 点击其它楼层中的“用户xx的回复（xx楼）”按钮（如果有），跳转到使得xx楼层居页面正中的位置，网页则保持不变为post的详情页
// 纯前端功能