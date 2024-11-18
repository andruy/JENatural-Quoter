package com.jenatural.quoter.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.stream.Collectors;

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

    public List<List<String>> submitForm(Form form) {
        List<ActiveIngredient> activeIngredients = new ArrayList<>();
        List<SmallIngredient> smallIngredients = new ArrayList<>();
        JSONObject mainObject = new JSONObject(parseJsonFile(FILE));
        JSONObject activeList = mainObject.getJSONObject("Ingredients");
        JSONObject smallList = mainObject.getJSONObject("SmallIngredients");
        int quantity = form.quantity();

        for (String key : form.activeIngredients().keySet()) {
            int totalMass = form.activeIngredients().get(key) * quantity;
            totalMass /= 1000;

            activeIngredients.add(new ActiveIngredient(key, totalMass, activeList.getBigDecimal(key).multiply(new BigDecimal(totalMass))));

            System.out.println(key + ": " + activeList.getBigDecimal(key));
        }
        System.out.println(activeIngredients);

        for (String key : form.smallIngredients().keySet()) {
            JSONObject ingredient = smallList.getJSONObject(key);

            double totalMass = form.smallIngredients().get(key) / 100.0;
            totalMass *= ingredient.getDouble("DV");
            totalMass *= quantity;
            totalMass /= 1000000.0;

            smallIngredients.add(new SmallIngredient(key, totalMass, ingredient.getBigDecimal("COST").multiply(new BigDecimal(totalMass))));

            System.out.println(key + ": " + ingredient.getBigDecimal("COST"));
        }
        System.out.println(smallIngredients);

        return List.of(activeIngredients.stream().map(ActiveIngredient::toString).collect(Collectors.toList()), smallIngredients.stream().map(SmallIngredient::toString).collect(Collectors.toList()));
    }
}
