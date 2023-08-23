package com.example.FEC_Server.domain.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TodoListData {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // PK

    private String loginId;
    private String plantName;
    private String todo;
    private String time;

}
