package com.aspataru.droney.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@ToString
public class Flight {
	private LocalDateTime dateAndTime;
	private String locationLink;
	private Integer averageHeightInMeters;
	private String equipment;

}
