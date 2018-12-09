package com.aspataru.droney.repository;

import com.aspataru.droney.dto.Video;
import org.junit.Assert;
import org.junit.Test;

import java.util.List;

public class TestVideoRepository {

	@Test
	public void shouldRetrieveTheListOfVideos() {
		VideoRepository rep = new VideoRepository();
		List<Video> videos = rep.retrieveAllVideos();
		Assert.assertFalse(videos.isEmpty());
	}

}