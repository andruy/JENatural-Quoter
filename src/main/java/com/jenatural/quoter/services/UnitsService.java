package com.jenatural.quoter.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.jenatural.quoter.models.Bottle;
import com.jenatural.quoter.models.BottleCap;
import com.jenatural.quoter.models.BottleCapType;
import com.jenatural.quoter.models.BottleAndCapColor;
import com.jenatural.quoter.models.BottleSize;
import com.jenatural.quoter.models.CapsuleType;
import com.jenatural.quoter.models.Weight;

@Service
public class UnitsService {
    public List<Integer> getWeightUnits() {
        List<Integer> weightList = new ArrayList<>();
        for (Weight w : Weight.values()) {
            weightList.add(w.getMass());
        }
        return weightList;
    }

    public List<String> getCapsuleTypes() {
        List<String> options = new ArrayList<>();
        for (CapsuleType c : CapsuleType.values()) {
            options.add(c.toString());
        }
        return options;
    }

    public Map<Bottle, List<Integer>> getBottleSizes() {
        Map<Bottle, List<Integer>> sizes = new HashMap<>();
        for (BottleSize b : BottleSize.values()) {
            sizes.put(b.getBottle(), b.getCapacity());
        }
        return sizes;
    }

    public int getNumberOfBottles(int capsuleQuantity, int capsulesPerBottle) {
        return capsuleQuantity / capsulesPerBottle;
    }

    public List<BottleCap> getBottleCapTypes() {
        List<BottleCap> options = new ArrayList<>();
        for (BottleCapType b : BottleCapType.values()) {
            options.add(b.getBottleCap());
        }
        return options;
    }

    public List<String> getBottleAndCapColors() {
        List<String> options = new ArrayList<>();
        for (BottleAndCapColor b : BottleAndCapColor.values()) {
            options.add(b.toString());
        }
        return options;
    }
}
