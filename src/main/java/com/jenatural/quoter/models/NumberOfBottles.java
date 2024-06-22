package com.jenatural.quoter.models;

public class NumberOfBottles {
    private final int QUANTITY;

    NumberOfBottles(int capsules, int capsPerBottle) {
        this.QUANTITY = capsules / capsPerBottle;
    }

    public int getQuantity() {
        return QUANTITY;
    }
}
