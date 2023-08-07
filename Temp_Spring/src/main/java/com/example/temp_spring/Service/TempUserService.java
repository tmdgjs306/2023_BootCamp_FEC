package com.example.temp_spring.Service;

import com.example.temp_spring.Security.SHA256;
import com.example.temp_spring.domain.dto.TempUserJoinRequest;
import com.example.temp_spring.domain.user.TempUser;
import com.example.temp_spring.repository.TempUserRepository;
import com.example.temp_spring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class TempUserService {

    private final UserRepository userRepository;
    private final TempUserRepository tempUserRepository;

    public void join(TempUserJoinRequest req) throws NoSuchAlgorithmException {
        tempUserRepository.save(req.toEntity());
    }

    public void delete(String loginId){
        tempUserRepository.deleteTempUserByLoginId(loginId);
    }

    public List<TempUser> getAllTempUser(){
        return tempUserRepository.findAllTempUser();
    }


}
