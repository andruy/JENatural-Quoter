package com.jenatural.quoter.services;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.jenatural.quoter.models.Bottle;
import com.jenatural.quoter.models.BottleCapType;
import com.jenatural.quoter.models.BottleAndCapColor;
import com.jenatural.quoter.models.BottleSize;
import com.jenatural.quoter.models.CapsuleType;
import com.jenatural.quoter.models.Weight;

@Service
public class UnitsService {
    private final String TEMPLATE = parseJsonFile("list.json");

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

    public List<String> getBottleCapTypes() {
        List<String> options = new ArrayList<>();
        for (BottleCapType b : BottleCapType.values()) {
            options.add(b.toString());
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

    public List<String> getActiveIngredients() {
        List<String> ingredients = new ArrayList<>();
        JSONObject jsonObject = new JSONObject(TEMPLATE).getJSONObject("Ingredients");
        for (String key : jsonObject.keySet()) {
            ingredients.add(key);
        }
        return ingredients;
    }

    public List<String> getSmallIngredients() {
        List<String> ingredients = new ArrayList<>();
        JSONObject jsonObject = new JSONObject(TEMPLATE).getJSONObject("SmallIngredients");
        for (String key : jsonObject.keySet()) {
            ingredients.add(key);
        }
        return ingredients;
    }

    private String parseJsonFile(String file) {
        StringBuilder sb = new StringBuilder();

        try {
            Scanner scanner = new Scanner(new File(file));
            while (scanner.hasNextLine()) {
                sb.append(scanner.nextLine());
            }
            scanner.close();
        } catch (FileNotFoundException  e) {
            e.printStackTrace();
        }

        return sb.toString();
    }
}
