package com.jenatural.quoter.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jenatural.quoter.model.Bottle;
import com.jenatural.quoter.model.Form;
import com.jenatural.quoter.service.UnitsService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class UnitsController {
    @Autowired
    private UnitsService unitsService;
    
    @GetMapping("/weightUnits")
    public ResponseEntity<List<Integer>> getMass() {
        return ResponseEntity.ok(unitsService.getWeightUnits());
    }

    @GetMapping("/capTypes")
    public ResponseEntity<List<String>> getCapsuleTypes() {
        return ResponseEntity.ok(unitsService.getCapsuleTypes());
    }

    @GetMapping("/bottleSizes")
    public ResponseEntity<Map<Bottle, List<Integer>>> getBottleSizes() {
        return ResponseEntity.ok(unitsService.getBottleSizes());
    }

    @GetMapping("numberOfBottles")
    public ResponseEntity<Integer> getNumberOfBottles(@RequestParam Integer capsuleQuantity, @RequestParam Integer capsulesPerBottle) {
        return ResponseEntity.ok(unitsService.getNumberOfBottles(capsuleQuantity, capsulesPerBottle));
    }

    @GetMapping("/bottleCapTypes")
    public ResponseEntity<List<String>> getBottleCapTypes() { // TODO
        return ResponseEntity.ok(unitsService.getBottleCapTypes());
    }

    @GetMapping("/bottleAndCapColors")
    public ResponseEntity<List<String>> getBottleAndCapColors() {
        return ResponseEntity.ok(unitsService.getBottleAndCapColors());
    }

    @GetMapping("/activeIngredients")
    public ResponseEntity<List<String>> getActiveIngredients(String param) {
        return ResponseEntity.ok(unitsService.getActiveIngredients());
    }

    @GetMapping("/smallIngredients")
    public ResponseEntity<List<String>> getSmallIngredients() {
        return ResponseEntity.ok(unitsService.getSmallIngredients());
    }

    @PostMapping("/submit")
    public ResponseEntity<Double> submitForm(@RequestBody Form form) {
        return ResponseEntity.ok(unitsService.submitForm(form));
    }
}
