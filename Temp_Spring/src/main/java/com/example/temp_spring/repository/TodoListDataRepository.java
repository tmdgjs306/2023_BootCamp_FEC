package com.example.temp_spring.repository;

import com.example.temp_spring.domain.data.TodoListData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoListDataRepository extends JpaRepository<TodoListData, Long> {

    List<TodoListData> findTodoListDataByLoginId(String loginId);
}
