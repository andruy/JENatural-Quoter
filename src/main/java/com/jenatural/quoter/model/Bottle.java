package com.jenatural.quoter.model;

public record Bottle(String capacity, String capSize) implements Comparable<Bottle> {
    @Override
    public final String toString() {
        return capacity + " with " + capSize + " bottle cap";
    }

    @Override
    public int compareTo(Bottle other) {
        return Integer.compare(
            Integer.parseInt(this.capacity.substring(0, this.capacity.indexOf("cc"))), Integer.parseInt(other.capacity.substring(0, other.capacity.indexOf("cc")))
        );
    }
}
