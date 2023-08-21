package com.example.FEC_Server.repository;

import com.example.FEC_Server.domain.data.TodoListData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoListDataRepository extends JpaRepository<TodoListData, Long> {

    List<TodoListData> findTodoListDataByLoginId(String loginId);
}
