package com.forum.controller;

@RestController
@RequestMapping("/api/admin/reports")
public class ManageReportsController {

    @Autowired
    private ManageReportsService manageReportsService;

    @GetMapping("/posts")
    public Result<List<Report>> getReportedPosts(
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate) {
        return Result.success(manageReportsService.getReportedPostsByDate(startDate, endDate));
    }
    //start date should be earlier or equals to end date, how to implement this? at the service layer?

    @GetMapping("/comments")
    public Result<List<Report>> getReportedComments(
            @RequestParam Date startDate,
            @RequestParam Date endDate) {
        return Result.success(manageReportsService.getReportedCommentsByDate(startDate, endDate));
    }

    @PutMapping("/posts/{reportId}/ignore")
    public Result<?> ignorePost(
            @PathVariable Long reportId,
            @RequestHeader("Admin-Token") String adminToken) {
        manageReportsService.ignorePost(reportId);
        return Result.success();
    }

    @PutMapping("/posts/{reportId}/hide")
    public Result<?> hidePost(
            @PathVariable Long reportId,
            @RequestHeader("Admin-Token") String adminToken) {
        manageReportsService.hidePost(reportId);
        return Result.success();
    }

    @PutMapping("/comments/{reportId}/ignore")
    public Result<?> ignoreComment(
            @PathVariable Long reportId,
            @RequestHeader("Admin-Token") String adminToken) {
        manageReportsService.ignoreComment(reportId);
        return Result.success();
    }

    @PutMapping("/comments/{reportId}/hide")
    public Result<?> hideComment(
            @PathVariable Long reportId,
            @RequestHeader("Admin-Token") String adminToken) {
        manageReportsService.hideComment(reportId);
        return Result.success();
    }
}
