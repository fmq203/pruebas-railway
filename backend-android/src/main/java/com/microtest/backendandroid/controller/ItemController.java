package com.microtest.backendandroid.controller;

import com.microtest.backendandroid.model.Item;
import com.microtest.backendandroid.repository.ItemRepository;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mobile/api/v1/items")
@CrossOrigin(origins = "*")
public class ItemController {

    private final ItemRepository repo;

    public ItemController(ItemRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public Page<Item> listar(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return repo.findAll(PageRequest.of(page, size, Sort.by("creadoEn").descending()));
    }

    @PostMapping
    public Item crear(@RequestBody Item item) {
        return repo.save(item);
    }
}
