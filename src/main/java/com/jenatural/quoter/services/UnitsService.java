package com.jenatural.quoter.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.jenatural.quoter.models.BottleSize;
import com.jenatural.quoter.models.CapType;
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

    public List<String> getCapTypes() {
        List<String> options = new ArrayList<>();
        for (CapType c : CapType.values()) {
            options.add(c.toString());
        }
        return options;
    }

    public Map<String, List<Integer>> getBottleSizes() {
        Map<String, List<Integer>> sizes = new HashMap<>();
        for (BottleSize b : BottleSize.values()) {
            String str = b.toString();
            int i = str.indexOf("_") + 1;
            sizes.put(str.substring(i), b.getCapacity());
        }
        return sizes;
    }
}
