package com.forum.controller;

@RestController
@RequestMapping("/api/register")
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @PostMapping("/send-code")
    public Result<?> sendVerificationCode(@RequestBody EmailVerificationDTO dto) {
        registerService.sendVerificationCode(dto.getEmail());
        return Result.success();
    }

    @PostMapping("/verify-code")
    public Result<?> verifyCode(@RequestBody EmailVerificationDTO dto) {
        boolean isValid = registerService.verifyCode(dto.getEmail(), dto.getCode());
        return isValid ? Result.success() : Result.error("验证码错误");
    }

    @PostMapping
    public Result<?> register(@RequestBody RegisterDTO registerDTO) {
        Long userId = registerService.register(registerDTO);
        return Result.success(userId);
    }
}

