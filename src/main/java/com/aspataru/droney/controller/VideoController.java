package com.aspataru.droney.controller;


import com.aspataru.droney.dto.Video;
import com.aspataru.droney.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class VideoController {

	private final VideoRepository videoRepository;

	@RequestMapping(value = "/videos", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Video> videos() {
		return videoRepository.retrieveAllVideos();
	}

}