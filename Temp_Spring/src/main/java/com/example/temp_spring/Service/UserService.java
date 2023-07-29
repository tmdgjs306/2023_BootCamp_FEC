package com.example.temp_spring.Service;

import com.example.temp_spring.domain.user.User;
import com.example.temp_spring.repository.UserRepository;
import com.example.temp_spring.domain.dto.JoinRequest;
import com.example.temp_spring.domain.dto.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class UserService {


    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    public boolean checkLoginIdDuplicate(String loginId) {
        return userRepository.existsByLoginId(loginId);
    }

    public void join(JoinRequest req) throws NoSuchAlgorithmException {
        userRepository.save(req.toEntity(encoder.encode(req.getPassword())));
    }

    public User login(LoginRequest req) throws NoSuchAlgorithmException {
        Optional<User> optionalUser = userRepository.findByLoginId(req.getLoginId());

        // loginId와 일치하는 User가 없으면 null return
        if(optionalUser.isEmpty()) {
            return null;
        }

        User user = optionalUser.get();
        // 찾아온 User의 password와 입력된 password가 다르면 null return

        return user;

    }

    public User getLoginUserById(Long userId) {
        if(userId == null) return null;

        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isEmpty()) return null;

        return optionalUser.get();
    }

    public User getLoginUserByLoginId(String loginId) {
        if(loginId == null) return null;

        Optional<User> optionalUser = userRepository.findByLoginId(loginId);
        if(optionalUser.isEmpty()) return null;

        return optionalUser.get();
    }
}
