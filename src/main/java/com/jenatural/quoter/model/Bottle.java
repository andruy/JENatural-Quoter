package com.jenatural.quoter.model;

public record Bottle(String capacity, String capSize) {
    @Override
    public final String toString() {
        return capacity + " with " + capSize + " bottle cap";
    }
}
