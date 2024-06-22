package com.jenatural.quoter.models;

import java.util.List;

public enum BottleSize {
    ONEFIFTY_150cc,
    TWOFIFTY_250cc;

    public List<Integer> getCapacity() {
        if (this == ONEFIFTY_150cc) {
            return List.of(30, 60);
        }

        if (this == TWOFIFTY_250cc) {
            return List.of(90, 120);
        }

        return null;
    }
}
