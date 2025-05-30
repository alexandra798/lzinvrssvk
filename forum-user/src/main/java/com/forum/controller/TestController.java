package com.forum.controller;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private TestService testService;

    @PostMapping("/submit")
    public Result<?> submitAnswers(@RequestBody TestAnswerDTO testAnswerDTO) {
        try {
            testService.submitAnswers(testAnswerDTO);
            return Result.success();
        } catch (BusinessException e) {
            return Result.error(e.getMessage(), );
        }
    }
}

