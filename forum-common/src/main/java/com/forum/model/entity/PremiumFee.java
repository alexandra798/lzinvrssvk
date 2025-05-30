package com.forum.model.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PremiumFee {
    private Long id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private BigDecimal amount;
}
