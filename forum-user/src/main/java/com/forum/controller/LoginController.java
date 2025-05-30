package com.forum.controller;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public Result<?> login(@RequestBody LoginDTO loginDTO) {
        return Result.success(loginService.login(loginDTO));
    }

    @PostMapping("/logout")
    public Result<?> logout(HttpSession session) {
        loginService.logout(session);
        return Result.success();
    }
}