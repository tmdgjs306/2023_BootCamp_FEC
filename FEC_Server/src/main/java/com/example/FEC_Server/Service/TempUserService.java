package com.example.FEC_Server.Service;

import com.example.FEC_Server.domain.dto.TempUserJoinRequest;
import com.example.FEC_Server.domain.user.TempUser;
import com.example.FEC_Server.repository.TempUserRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TempUserService {

    private final TempUserRepository tempUserRepository;

    public boolean checkLoginIdDuplicate(String loginId){return tempUserRepository.existsByLoginId(loginId);}
    public void join(TempUserJoinRequest req) throws NoSuchAlgorithmException {
        tempUserRepository.save(req.toEntity());
    }

    public void delete(String loginId){
        tempUserRepository.deleteTempUserByLoginId(loginId);
    }

    public String getAllTempUser(){
        JSONArray jsonArray = new JSONArray();
        List<TempUser> list  = tempUserRepository.findAllTempUser();
        for(int i=0; i<list.size(); i++){
            JSONObject jsonObject = new JSONObject();
            TempUser tempUser = list.get(i);
            jsonObject.put("index",i+1);
            jsonObject.put("loginId",tempUser.getLoginId());
            jsonObject.put("email",tempUser.getEmail());
            jsonObject.put("password",tempUser.getPassword());
            jsonObject.put("farmId",tempUser.getFarmId());
            jsonArray.add(jsonObject);
        }
        return jsonArray.toJSONString();
    }

    public TempUser findById(String loginId){return tempUserRepository.findByLoginId(loginId);}
}
