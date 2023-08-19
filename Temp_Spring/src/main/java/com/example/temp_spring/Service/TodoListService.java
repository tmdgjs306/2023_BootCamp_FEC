package com.example.temp_spring.Service;

import com.example.temp_spring.domain.data.TodoListData;
import com.example.temp_spring.repository.TodoListDataRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TodoListService {

    private final TodoListDataRepository todoListDataRepository;
    private final JSONParser parser = new JSONParser();

    public void add(String data, String loginId) throws ParseException {
        JSONObject jsonObject = (JSONObject) parser.parse(data);
        String time = (String) jsonObject.get("time");
        String plantName = (String) jsonObject.get("plantName");
        String todo = (String) jsonObject.get("todo");

        TodoListData todoListData = TodoListData.builder()
                .loginId(loginId)
                .plantName(plantName)
                .time(time)
                .todo(todo)
                .build();
        todoListDataRepository.save(todoListData);
    }

    public String getTodoListByLoginId(String loginId){
        JSONArray jsonArray = new JSONArray();
        List<TodoListData> list = todoListDataRepository.findTodoListDataByLoginId(loginId);
        for(int i=0; i<list.size(); i++){
            JSONObject jsonObject = new JSONObject();
            TodoListData todoListData = list.get(i);
            jsonObject.put("index",i+1);
            jsonObject.put("loginId",todoListData.getLoginId());
            jsonObject.put("plantName",todoListData.getPlantName());
            jsonObject.put("time",todoListData.getTime());
            jsonObject.put("todo",todoListData.getTodo());
            jsonArray.add(jsonObject);
        }
        return jsonArray.toJSONString();
    }
}
