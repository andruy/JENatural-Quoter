package com.jenatural.quoter.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.jenatural.quoter.model.ActiveIngredient;
import com.jenatural.quoter.model.Bottle;
import com.jenatural.quoter.model.BottleAndCapColor;
import com.jenatural.quoter.model.BottleCapType;
import com.jenatural.quoter.model.BottleSize;
import com.jenatural.quoter.model.CapsuleType;
import com.jenatural.quoter.model.Form;
import com.jenatural.quoter.model.SmallIngredient;
import com.jenatural.quoter.model.Weight;

@Service
public class UnitsService {
    private final String FILE = "list.json";

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

    public TreeMap<Bottle, List<Integer>> getBottleSizes() {
        Map<Bottle, List<Integer>> sizes = new HashMap<>();
        for (BottleSize b : BottleSize.values()) {
            sizes.put(b.getBottle(), b.getCapacity());
        }

        return new TreeMap<>(sizes);
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
        JSONObject jsonObject = new JSONObject(parseJsonFile(FILE)).getJSONObject("Ingredients");
        for (String key : jsonObject.keySet()) {
            ingredients.add(key);
        }
        return ingredients;
    }

    public List<String> getSmallIngredients() {
        List<String> ingredients = new ArrayList<>();
        JSONObject jsonObject = new JSONObject(parseJsonFile(FILE)).getJSONObject("SmallIngredients");
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

    public Map<String, Double> submitForm(Form form) {
        Map<String, Double> result = new HashMap<>();
        List<ActiveIngredient> activeIngredients = new ArrayList<>();
        List<SmallIngredient> smallIngredients = new ArrayList<>();
        JSONObject mainObject = new JSONObject(parseJsonFile(FILE));
        JSONObject activeList = mainObject.getJSONObject("Ingredients");
        JSONObject smallList = mainObject.getJSONObject("SmallIngredients");
        int quantity = form.quantity();
        double bottleQuantity = Math.ceil((double) quantity / form.pillsPerBottle());

        for (String key : form.activeIngredients().keySet()) {
            int totalMass = form.activeIngredients().get(key) * quantity;
            totalMass /= 1000;

            activeIngredients.add(new ActiveIngredient(key, totalMass, activeList.getBigDecimal(key).multiply(new BigDecimal(totalMass))));

            System.out.println(key + ": " + activeList.getBigDecimal(key));
        }
        System.out.println(activeIngredients);

        for (String key : form.smallIngredients().keySet()) {
            double totalMass = form.smallIngredients().get(key) * quantity;
            totalMass /= 1000000.0;

            smallIngredients.add(new SmallIngredient(key, totalMass, smallList.getBigDecimal(key).multiply(new BigDecimal(totalMass))));

            System.out.println(key + ": " + smallList.getBigDecimal(key));
        }
        System.out.println(smallIngredients);

        BigDecimal totalCost = new BigDecimal(0);
        for (ActiveIngredient activeIngredient : activeIngredients) {
            totalCost = totalCost.add(activeIngredient.totalCost());
        }
        for (SmallIngredient smallIngredient : smallIngredients) {
            totalCost = totalCost.add(smallIngredient.totalCost());
        }

        /**
         * Addendum
         */
        if (form.mass() == 500) {
            totalCost = totalCost.add(new BigDecimal(1 * bottleQuantity));
        }

        if (form.mass() == 1000) {
            totalCost = totalCost.add(new BigDecimal(2 * bottleQuantity));
        }

        if (form.capsuleType().equals("GELATINE")) {
            totalCost = totalCost.add(new BigDecimal(0.5 * bottleQuantity));
        }

        if (form.capsuleType().equals("VEGGIE")) {
            totalCost = totalCost.add(new BigDecimal(0.75 * bottleQuantity));
        }

        double quantityStartingPoint = 1.55;
        if (form.quantity() == 30000) {
            totalCost = totalCost.add(new BigDecimal(quantityStartingPoint * bottleQuantity));
        }

        for (int i = 40000; i <= 100000; i += 10000) {
            quantityStartingPoint = quantityStartingPoint - (3.0 / 100);
            if (form.quantity() == i) {
                totalCost = totalCost.add(new BigDecimal(quantityStartingPoint * bottleQuantity));
            }
        }

        for (int i = 110000; i <= 600000; i += 10000) {
            quantityStartingPoint = quantityStartingPoint - (2.0 / 100);
            if (form.quantity() == i) {
                totalCost = totalCost.add(new BigDecimal(quantityStartingPoint * bottleQuantity));
            }
        }

        for (int i = 610000; i <= 990000; i += 10000) {
            quantityStartingPoint = quantityStartingPoint - (1.0 / 100);
            if (form.quantity() == i) {
                totalCost = totalCost.add(new BigDecimal(quantityStartingPoint * bottleQuantity));
            }
        }

        if (form.bottleSize().contains("150cc")) {
            totalCost = totalCost.add(new BigDecimal(.5 * bottleQuantity));
        }

        if (form.bottleSize().contains("250cc")) {
            totalCost = totalCost.add(new BigDecimal(.65 * bottleQuantity));
        }

        if (form.bottleCapType().equals("REGULAR")) {
            totalCost = totalCost.add(new BigDecimal(.15 * bottleQuantity));
        }

        if (form.bottleCapType().equals("CRC")) {
            totalCost = totalCost.add(new BigDecimal(.2 * bottleQuantity));
        }

        if (form.pillsPerBottle() == 30) {
            totalCost = totalCost.add(new BigDecimal(.35 * bottleQuantity));
        }

        if (form.pillsPerBottle() == 60) {
            totalCost = totalCost.add(new BigDecimal(.45 * bottleQuantity));
        }

        if (form.pillsPerBottle() == 90) {
            totalCost = totalCost.add(new BigDecimal(.55 * bottleQuantity));
        }

        result.put("total", totalCost.setScale(2, java.math.RoundingMode.UP).doubleValue());
        result.put("bottleQuantity", bottleQuantity);
        result.put("eachBottleCost", totalCost.doubleValue() / bottleQuantity);
        System.out.println(result);

        return result;
    }
}
