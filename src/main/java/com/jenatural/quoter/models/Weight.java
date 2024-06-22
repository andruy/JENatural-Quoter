package com.jenatural.quoter.models;

public enum Weight {
    SMALL(500),
    LARGE(1000);

    private final int mass;

    Weight(int mass) {
        this.mass = mass;
    }

    public int getMass() {
        return mass;
    }
}
