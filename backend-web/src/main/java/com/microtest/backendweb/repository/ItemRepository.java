package com.microtest.backendweb.repository;

import com.microtest.backendweb.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
