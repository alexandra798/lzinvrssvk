package com.forum.controller;

@RestController
@RequestMapping("/api/admin/users/answers")
public class ReviewAnswersController {

    @Autowired
    private ReviewAnswersService reviewAnswersService;

    @GetMapping
    public Result<?> getUserAnswers(
            @RequestParam String status,
            @RequestHeader("Admin-Token") String adminToken) {
        return Result.success(reviewAnswersService.getUserAnswer(status));
    }

    @PostMapping
    public Result<?> addQuestion(QuestionListDTO questionListDTO){
        return Result.success(reviewAnswersService.addQuestion(questionListDTO));
    }

    @PostMapping
    public Result<?> submitReviewing(ReviewDTO reviewDTO){
        return Result.success(reviewAnswersService.submitReviewing(reviewDTO));
    }
}
