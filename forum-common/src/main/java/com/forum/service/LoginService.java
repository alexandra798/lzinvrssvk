package com.forum.service;

import com.forum.model.user.dto.LoginDTO;

public interface LoginService {

    void login(LoginDTO loginDTO);

    void logout(String token);
}