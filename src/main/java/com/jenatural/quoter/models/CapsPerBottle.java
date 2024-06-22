package com.jenatural.quoter.models;

public enum CapsPerBottle {
    THIRTY(30),
    SIXTY(60),
    NINETY(90),
    ONETWENTY(120);

    private final int capsules;

    CapsPerBottle(int capsules) {
        this.capsules = capsules;
    }

    public int getCapsules() {
        return capsules;
    }
}
