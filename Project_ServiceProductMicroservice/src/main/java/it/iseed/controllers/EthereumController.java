package it.iseed.controllers;

import java.math.BigDecimal;
import java.util.LinkedHashMap;

import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.LoginEntity;
import it.iseed.services.EthereumServiceImpl;
import it.iseed.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin("*")

@RestController
public class EthereumController{

	BigDecimal wei;
	@Autowired
    private EthereumServiceImpl ethereumService;

	//old method before jwt
	/*
	@RequestMapping(value="ethereumController/{u_wallet_address}", method = RequestMethod.POST,headers="Accept=application/json")
    protected BigDecimal checkEthValue(@PathVariable String u_wallet_address) {
		wei = ethereumService.getEthValue(u_wallet_address);
		return wei;
    }

*/
	@RequestMapping(value="ethereumController", method = RequestMethod.GET,headers="Accept=application/json")
	public ResponseEntity<JsonResponseBody> checkEthValue(HttpServletRequest request) {

        LoginEntity loginEntity= new LoginEntity();
        /////////////////////////////////////////////////////////////////////////////
        String jwt = JwtUtils.getJwtFromHttpRequest(request);
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
        headers.add("jwt", jwt);
        HttpEntity<?> request_2 = new HttpEntity(String.class, headers);

        RestTemplate restTemplate = new RestTemplate();
        try {/////////////////////////////////////////////////////checkjwtuser///////////////////////////get
            ResponseEntity<JsonResponseBody> responseEntity = restTemplate.exchange("http://localhost:8070/checkjwtuser", HttpMethod.GET, request_2, JsonResponseBody.class);
            int answer = (int) responseEntity.getBody().getServer();
            if (answer!=200){
                return responseEntity;
            }
            else {
                LinkedHashMap user = (LinkedHashMap) responseEntity.getBody().getResponse();
                String name = (String) user.get("u_wallet_address");/////////////////////////username
                loginEntity.setWalletAddress(name);

            }
        }catch (Exception e){
            System.out.println("eccezione: " + e);
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.INTERNAL_SERVER_ERROR.value(), "There is an error, sorry. Retry later. Error: "+e ));
        }
        ////////////////////////////////////////////////////////////////////////

        // return productService.getListOfProductsByUser(loginEntity);
        return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), ethereumService.getEthValue(loginEntity.getWalletAddress())));

	    /*
		wei = ethereumService.getEthValue(u_wallet_address);
		return wei;
		*/
	}

}

