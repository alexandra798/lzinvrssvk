package com.forum.service;

public interface NotificationService {
    /**
     * 当用户的帖子或评论收到回复时发送通知
     * @param userId 被回复用户的ID
     * @param postId 帖子ID
     * @param replyId 回复评论的ID
     */
    void ReplyToPostNotification(Long userId, Long postId, Long replyId);

    void ReplyToCommentNotification(Long userId, Long commentId, Long replyId);

    //像举报五次就折叠、有回复就通知这种都是自动机制，不知道要在哪一层实现，service层？？
}
