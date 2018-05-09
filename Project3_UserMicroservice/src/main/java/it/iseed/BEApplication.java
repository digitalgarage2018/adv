package it.iseed;


import org.jasypt.util.text.BasicTextEncryptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import it.iseed.account.utils.EncryptionUtils;


@SpringBootApplication
public class BEApplication {
	@Autowired
	EncryptionUtils encryptionUtils;
	
	@Bean
	public BasicTextEncryptor textEncryptor(){
		BasicTextEncryptor textEncryptor = new BasicTextEncryptor();
		textEncryptor.setPassword("mySecretEncriptionKeyBlaBla1234");
		return textEncryptor;
	}

	private static final Logger log = LoggerFactory.getLogger(BEApplication.class);

	public static void main(String[] args){
		SpringApplication.run(BEApplication.class, args);
	}
}
