package it.iseed;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class BEApplication {

	/*
	@Autowired
	EncryptionUtils encryptionUtils;
	
	@Bean
	public BasicTextEncryptor textEncryptor(){
		BasicTextEncryptor textEncryptor = new BasicTextEncryptor();
		textEncryptor.setPassword("mySecretEncriptionKeyBlaBla1234");
		return textEncryptor;
	}*/

	private static final Logger log = LoggerFactory.getLogger(BEApplication.class);

	public static void main(String[] args){
		SpringApplication.run(BEApplication.class, args);
	}
}
