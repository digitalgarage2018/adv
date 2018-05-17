package it.iseed.controllers;

import java.sql.Date;
import java.util.LinkedHashMap;

import javax.servlet.http.HttpServletRequest;

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

//import it.iseed.account.utils.NoDbConnection;
//import it.iseed.account.utils.UserNotLoggedException;
import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.PurchaseEntity;
import it.iseed.services.PurchaseService;
import it.iseed.utils.JwtUtils;

@CrossOrigin("*")

@RestController
public class PurchaseController {
	
//******LEGENDA STATUS COMUNICATI AL CLIENT
////////
////////OK->200->success
////////FORBIDDEN->403->errore di login e/o jwt errata
////////PRECONDITION_FAILED->412->token con formato errato
////////SERVICE_UNAVAILABLE->503->no db connection
////////NOT_IMPLEMENTED->501->errore generico
////////GATEWAY_TIMEOUT->504->session expired
////////
//******FINE LEGENDA
	
	@Autowired
	PurchaseService purchaseService;
	
	@RequestMapping(value = "/purchase/{service_id}/{purchase_date}", method = RequestMethod.POST,headers = "Accept=application/json")
    public ResponseEntity<JsonResponseBody> purchaseServiceByID(HttpServletRequest request, @PathVariable(name = "service_id") long service_id,  @PathVariable(name = "purchase_date") Date purchase_date){
		System.out.println("sono dentro");
		PurchaseEntity purchaseEntity = new PurchaseEntity();
		purchaseEntity.setPur_serviceID(service_id);
		purchaseEntity.setPur_date(purchase_date);
		//purchaseEntity.setPur_username("username falso");
		
		/////inizio controllo JWT
		String jwt = JwtUtils.getJwtFromHttpRequest(request);
    	MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
        headers.add("jwt", jwt);
        HttpEntity<?> request_2 = new HttpEntity(String.class, headers);

        RestTemplate restTemplate = new RestTemplate();
        try {
        	ResponseEntity<JsonResponseBody> responseEntity = restTemplate.exchange("http://localhost:8070/checkjwtuser", HttpMethod.POST, request_2, JsonResponseBody.class);
        	int answer = (int) responseEntity.getBody().getServer();
        	if (answer!=200){
        		return responseEntity;
        	}
        	else {
        	LinkedHashMap user = (LinkedHashMap) responseEntity.getBody().getResponse();
        	String name = (String) user.get("u_username");
        	System.out.println("name "+name);
        	purchaseEntity.setPur_username(name);
        	
        	}
        }catch (Exception e){
        	System.out.println("eccezione: " + e);
        	return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.INTERNAL_SERVER_ERROR.value(), "There is an error, sorry. Retry later. Error: "+e ));
        }
		/////fine controllo jwt
        
		try{
			return purchaseService.addPurchase(purchaseEntity);
		}
		catch(Exception e){
			System.out.println("eccezione: " + e);
        	return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.INTERNAL_SERVER_ERROR.value(), "There is an error, sorry. Retry later. Error: "+e ));
		}
	}

	@RequestMapping(value = "/getDate", method = RequestMethod.GET,headers = "Accept=application/json")
	public ResponseEntity<JsonResponseBody> getInvalidDate(){


		try {
			return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), purchaseService.getInvalidDate()));
		}catch (Exception e){
			return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "No connection DB"));
		}

	}
}
