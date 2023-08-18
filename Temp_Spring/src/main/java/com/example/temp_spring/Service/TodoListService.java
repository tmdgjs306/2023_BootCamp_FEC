package com.example.temp_spring.Service;

import com.example.temp_spring.domain.data.TodoListData;
import com.example.temp_spring.repository.TodoListDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TodoListService {

    private final TodoListDataRepository todoListDataRepository;

    public void add(TodoListData todoListData){
        todoListDataRepository.save(todoListData);
    }

    public List<TodoListData> getTodoListByLoginId(String loginId){
        return todoListDataRepository.findTodoListDataByLoginId(loginId);
    }
}
