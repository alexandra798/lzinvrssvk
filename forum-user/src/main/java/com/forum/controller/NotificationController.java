package com.forum.controller;

@RestController
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/api/notifications/{userId}")
    public Result<List<NotificationVO>> getNotifications(@PathVariable Long userId) {
        List<NotificationVO> notifications = notificationService.getNotifications(userId);
        return Result.success(notifications);
    }
}