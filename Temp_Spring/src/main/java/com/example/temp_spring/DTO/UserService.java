package com.example.temp_spring.DTO;

import com.example.temp_spring.Security.SHA256;
import com.example.temp_spring.User.User;
import com.example.temp_spring.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    SHA256 sha256 = new SHA256();
    private final UserRepository userRepository;

    public boolean checkLoginIdDuplicate(String loginId) {
        return userRepository.existsByLoginId(loginId);
    }

    public void join(JoinRequest req) throws NoSuchAlgorithmException {
        String salt = sha256.getSalt();
        userRepository.save(req.toEntity(sha256.getSalt()));
    }

    public User login(LoginRequest req) throws NoSuchAlgorithmException {
        Optional<User> optionalUser = userRepository.findByLoginId(req.getLoginId());

        // loginId와 일치하는 User가 없으면 null return
        if(optionalUser.isEmpty()) {
            return null;
        }

        User user = optionalUser.get();
        String salt = user.getSalt();
        String cryptogram = sha256.encrypt(req.getPassword()+salt,3);

        // 찾아온 User의 password와 입력된 password가 다르면 null return
        if(!user.getPasswd().equals(cryptogram)) {
            return null;
        }

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
