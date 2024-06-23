package com.jenatural.quoter.models;

public record Bottle(String capacity, String capSize) {
    @Override
    public final String toString() {
        return capacity + " with " + capSize + " bottle cap";
    }
}
