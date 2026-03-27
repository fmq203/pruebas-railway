package com.microtest.backendweb.config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import javax.sql.DataSource;
import java.sql.Connection;

@Component
public class DbHealthCheck implements ApplicationRunner {

    private final DataSource dataSource;

    public DbHealthCheck(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        try (Connection conn = dataSource.getConnection()) {
            System.out.println("PostgreSQL conectado: " + conn.getMetaData().getURL());
        }
    }
}
