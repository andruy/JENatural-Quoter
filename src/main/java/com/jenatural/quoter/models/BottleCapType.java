package com.jenatural.quoter.models;

import java.math.BigDecimal;

public enum BottleCapType {
    REGULAR,
    CRC;

    public BottleCap getBottleCap() {
        if (this == REGULAR) {
            return new BottleCap("REGULAR", BigDecimal.valueOf(2.5));
        }

        if (this == CRC) {
            return new BottleCap("CRC", BigDecimal.valueOf(3.5));
        }

        return null;
    }
}
