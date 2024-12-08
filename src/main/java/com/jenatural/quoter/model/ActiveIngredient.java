package com.jenatural.quoter.model;

import java.math.BigDecimal;

public record ActiveIngredient(String name, int totalMassInGrams, BigDecimal totalCost) {}
