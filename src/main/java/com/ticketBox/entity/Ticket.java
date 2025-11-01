package com.ticketBox.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@Table(name = "Ticket")
//VP票券
public class Ticket {

    @Id
    @Column(nullable = false)
    private String memberId;

    @Column(nullable = false)
    private String vpTransactionId;

    @Column(nullable = false)
    private String title;

    private Double price;

    private LocalDateTime eventDate;

    private String seatArea;

    private String location;
}

