package com.jenatural.quoter.model;

import java.util.Map;

public record Form(
    double mass,
    String capsuleType,
    int quantity,
    String bottleSize,
    String bottleColor,
    String bottleCapType,
    String bottleCapColor,
    int pillsPerBottle,
    Map<String, Integer> smallIngredients,
    Map<String, Integer> activeIngredients
) {}
