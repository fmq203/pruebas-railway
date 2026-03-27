package com.microtest.backendweb.controller;

import com.microtest.backendweb.model.Item;
import com.microtest.backendweb.repository.ItemRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class ItemController {

    private final ItemRepository repo;

    public ItemController(ItemRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Item> listar() {
        return repo.findAll();
    }

    @PostMapping
    public Item crear(@RequestBody Item item) {
        return repo.save(item);
    }
}
