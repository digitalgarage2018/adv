package it.iseed;


import it.iseed.account.utils.EncryptionUtils;
import org.jasypt.util.text.BasicTextEncryptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


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
	}
*/

	private static final Logger log = LoggerFactory.getLogger(BEApplication.class);


	public static void main(String[] args){
		System.out.println("  .   ____          _            __ _ _\n" +
				" /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\\n" +
				"( ( )\\___ | '_ | '_| | '_ \\/ _` | \\ \\ \\ \\\n" +
				" \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )\n" +
				"  '  |____| .__|_| |_|_| |_\\__, | / / / /\n" +
				" =========|_|==============|___/=/_/_/_/");
		System.out.println("  .   ____          _            __ _ _\n" +
				" /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\\n" +
				"( ( )\\___ | '_ | '_| | '_ \\/ _` | \\ \\ \\ \\\n" +
				" \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )\n" +
				"  '  |____| .__|_| |_|_| |_\\__, | / / / /\n" +
				" =========|_|==============|___/=/_/_/_/");
		System.out.println("  .   ____          _            __ _ _\n" +
				" /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\\n" +
				"( ( )\\___ | '_ | '_| | '_ \\/ _` | \\ \\ \\ \\\n" +
				" \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )\n" +
				"  '  |____| .__|_| |_|_| |_\\__, | / / / /\n" +
				" =========|_|==============|___/=/_/_/_/");

		System.out.println("( ͡° ͜ʖ ͡°)");
		System.out.println("( ͡° ͜ʖ ͡°)");

		System.out.println("( ͡° ͜ʖ ͡°)");

		System.out.println("( ͡° ͜ʖ ͡°)");

		System.out.println("( ͡° ͜ʖ ͡°)");



		SpringApplication.run(BEApplication.class, args);




	}
}
