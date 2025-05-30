package com.forum.controller;

@RestController
@RequestMapping("/api/manage-users")
@RequiredArgsConstructor
public class ManageUsersController {

    private final ManageUsersService manageUsersService;


    @PostMapping("/users/{userId}/ban")
    public Result<?> banUser(
            @PathVariable Long userId,
            @RequestBody BanUserDTO banDTO,
            @RequestHeader("Admin-Token") String adminToken) {
        manageUsersService.banUser(userId, banDTO.getDays());
        return Result.success();
    }

    @PostMapping("/users/{userId}/mute")
    public Result<?> muteUser(
            @PathVariable Long userId,
            @RequestBody MuteUserDTO muteDTO,
            @RequestHeader("Admin-Token") String adminToken) {
        manageUsersService.muteUser(userId, muteDTO.getDays());
        return Result.success();
    }
}