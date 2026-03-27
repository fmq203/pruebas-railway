package com.microtest.backendandroid.repository;

import com.microtest.backendandroid.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
