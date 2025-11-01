package com.ticketBox.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "users")
@AllArgsConstructor
public class User {

    @Id
    private String memberId;

    @Column(nullable = false)
    private String transactionId;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String validateStage;

    private String phoneNumber;

    public User() {} // 添加无参构造函数

}
