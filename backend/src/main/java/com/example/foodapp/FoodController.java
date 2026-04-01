package com.example.foodapp;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = "*")
public class FoodController {

    private final FoodRepository repo;

    public FoodController(FoodRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Food> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Food create(@RequestBody Food food) {
        return repo.save(food);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
