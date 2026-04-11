package com.flexit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FlexitApplication {

    public static void main(String[] args) {
        SpringApplication.run(FlexitApplication.class, args);
        System.out.println("Mongo URI: " + System.getProperty("spring.data.mongodb.uri"));
    }

}