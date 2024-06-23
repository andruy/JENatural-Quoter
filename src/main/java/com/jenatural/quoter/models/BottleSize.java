package com.jenatural.quoter.models;

import java.util.List;

public enum BottleSize {
    ONEFIFTY,
    TWOFIFTY;

    public Bottle getBottle() {
        if (this == ONEFIFTY) {
            return new Bottle("150 cc / 5.0oz", "38mm");
        }

        if (this == TWOFIFTY) {
            return new Bottle("250cc / 8.5oz", "45mm");
        }

        return null;
    }

    public List<Integer> getCapacity() {
        if (this == ONEFIFTY) {
            return List.of(30, 60);
        }

        if (this == TWOFIFTY) {
            return List.of(90, 120);
        }

        return null;
    }
}
