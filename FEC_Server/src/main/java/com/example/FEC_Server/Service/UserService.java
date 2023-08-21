package com.example.FEC_Server.Service;

import com.example.FEC_Server.Security.SHA256;
import com.example.FEC_Server.domain.user.TempUser;
import com.example.FEC_Server.domain.user.User;
import com.example.FEC_Server.domain.user.UserRole;
import com.example.FEC_Server.repository.UserRepository;
import com.example.FEC_Server.domain.dto.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final SHA256 sha256 = new SHA256();
    private final TempUserService tempUserService;
    public boolean checkLoginIdDuplicate(String loginId) {
        return userRepository.existsByLoginId(loginId);
    }

    public void join(String tempUserId) throws NoSuchAlgorithmException {
        TempUser tempUser = tempUserService.findById(tempUserId);
        String salt = sha256.getSalt();
        User user = User.builder()
                .loginId(tempUser.getLoginId())
                .passwd(sha256.encrypt(tempUser.getPassword()+salt,3))
                .role(UserRole.USER)
                .farmId(tempUser.getFarmId())
                .salt(salt)
                .email(tempUser.getEmail())
                .build();
        userRepository.save(user);
    }

    public User login(LoginRequest req) throws NoSuchAlgorithmException {
        Optional<User> optionalUser = userRepository.findByLoginId(req.getLoginId());

        // loginId와 일치하는 User가 없으면 null return
        if(optionalUser.isEmpty()) {
            return null;
        }

        User user = optionalUser.get();

        // 찾아온 User의 password와 입력된 password가 다르면 null return
        if(!user.getPasswd().equals(sha256.encrypt(req.getPassword()+user.getSalt(),3))){
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

    public String getUserInfo(String loginId){
        JSONObject jsonObject = new JSONObject();
        User user = getLoginUserByLoginId(loginId);

        //JSON 형태로 값 전송
        jsonObject.put("loginId",user.getLoginId());
        jsonObject.put("email",user.getEmail());
        jsonObject.put("farmId",user.getFarmId());

        return jsonObject.toJSONString();
    }

    public int getFarmIdByLoginId(String loginId){
        User user = getLoginUserByLoginId(loginId);
        return user.getFarmId();
    }
}
