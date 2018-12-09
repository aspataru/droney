package com.aspataru.droney;

import com.aspataru.droney.controller.VideoController;
import com.aspataru.droney.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DroneyApplication {

	@Bean
	public VideoRepository videoRepository() {
		return new VideoRepository();
	}

	@Autowired
	public VideoController videoController;

	public static void main(String[] args) {
		SpringApplication.run(DroneyApplication.class, args);
	}
}
