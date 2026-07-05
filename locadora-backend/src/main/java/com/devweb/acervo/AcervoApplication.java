package com.devweb.acervo;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.devweb.acervo.model.Item;

@SpringBootApplication
public class AcervoApplication {

	public static void main(String[] args) throws ParseException {
		

		LocalDate localDate = LocalDate.now();
		System.out.println("local date" + localDate);
		Date date = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
		System.out.println("date formatted" + date);
		SpringApplication.run(AcervoApplication.class, args);
	}

}
