package com.aspataru.droney.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString
public class Video {
	private String videoId;
	private String title;
	private Integer startSeconds;
	private Integer endSeconds;
	private String suggestedQuality;
	private Flight flight;
}
