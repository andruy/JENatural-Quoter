package com.jenatural.quoter.models;

public enum BottleCapType {
    REGULAR,
    CRC;

    public BottleCap getBottleCap() {
        if (this == REGULAR) {
            return new BottleCap("REGULAR", 2);
        }

        if (this == CRC) {
            return new BottleCap("CRC", 3);
        }

        return null;
    }
}
