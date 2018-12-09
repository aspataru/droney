package com.aspataru.droney.repository;

import com.aspataru.droney.dto.Video;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializer;
import lombok.extern.slf4j.Slf4j;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Slf4j
public class VideoRepository {

	private static final Gson GSON = new GsonBuilder().registerTypeAdapter(LocalDateTime.class,
			(JsonDeserializer<LocalDateTime>) (json, type, jsonDeserializationContext) ->
					ZonedDateTime.parse(json.getAsJsonPrimitive().getAsString()).toLocalDateTime()).create();

	public List<Video> retrieveAllVideos() {
		String videosFilePath = VideoRepository.class.getResource("/data/videos.json").getPath();
		try (FileReader fileReader = new FileReader(videosFilePath)) {
			Video[] videos = GSON.fromJson(new BufferedReader(fileReader), Video[].class);
			return Arrays.asList(videos);

		} catch (IOException e) {
			log.error("Could not open file {}", videosFilePath);
			return Collections.emptyList();
		}
	}

}
