package com.jenatural.quoter.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jenatural.quoter.services.UnitsService;

@RestController
public class UnitsController {
    @Autowired
    private UnitsService unitsService;
    
    @GetMapping("/weightUnits")
    public ResponseEntity<List<Integer>> getMass() {
        return ResponseEntity.ok(unitsService.getWeightUnits());
    }

    @GetMapping("/capTypes")
    public ResponseEntity<List<String>> getCapTypes() {
        return ResponseEntity.ok(unitsService.getCapTypes());
    }

    @GetMapping("/bottleSizes")
    public ResponseEntity<Map<String, List<Integer>>> getBottleSizes() {
        return ResponseEntity.ok(unitsService.getBottleSizes());
    }
}
