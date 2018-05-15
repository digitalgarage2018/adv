package it.iseed.controllers;

import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.LoginEntity;
import it.iseed.entities.ProductEntity;
import it.iseed.services.ProductService;
import it.iseed.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.LinkedHashMap;
import java.util.List;


@CrossOrigin("*")


@RestController
public class ProductController {

    @Autowired
    ProductService productService;


    @RequestMapping(value="/products/{p_product_id}", method = RequestMethod.GET,headers="Accept=application/json")
    public ProductEntity getProductById(@PathVariable long p_product_id) {

        return productService.getProductById(p_product_id);
    }

    
    
    @RequestMapping(value = "/products/", method = RequestMethod.GET,headers="Accept=application/json")
    public ResponseEntity<JsonResponseBody> getListOfProducts(HttpServletRequest request)  {

    	//System.out.println("sono in products: ");
    	String jwt = JwtUtils.getJwtFromHttpRequest(request);
    	MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
       
        headers.add("jwt", jwt);
        HttpEntity<?> request_2 = new HttpEntity(String.class, headers);
        RestTemplate restTemplate = new RestTemplate();

        try {
        	//System.out.println("sono nel try: ");
        	ResponseEntity<JsonResponseBody> responseEntity = restTemplate.exchange("http://192.168.171.55:8070/checkjwtuser", HttpMethod.POST, request_2, JsonResponseBody.class);
        	int answer = (int) responseEntity.getBody().getServer();
        	System.out.println("print dell'answer: "+answer);
        	if (answer!=200){
        		return responseEntity;
        	}
        	else {
        		//System.out.println("sono nell'else: ");
        	//LinkedHashMap center = (LinkedHashMap) responseEntity.getBody().getResponse();
        	//String name = (String) center.get("w_name");
        	//serviceEntity.setSr_wellness_center(name);
        	}
        }catch (Exception e){
        	//System.out.println("eccezione: " + e);
        	return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.INTERNAL_SERVER_ERROR.value(), "There is an error, sorry. Retry later. Error: "+e ));
        }
        System.out.println("sono tra le due try: ");
    	try {
    		//System.out.println("successo: ");
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), productService.getListOfProducts()));
        }catch (Exception e){
        	//System.out.println("seconda eccezione: ");
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "No connection DB"));
        }

    }

    @RequestMapping(value = "/productsUser/", method = RequestMethod.GET,headers="Accept=application/json")
    public ResponseEntity<JsonResponseBody> getListOfProductsByUser( HttpServletRequest request){

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
                String name = (String) user.get("u_username");/////////////////////////username
                loginEntity.setUsername(name);

            }
        }catch (Exception e){
            System.out.println("eccezione: " + e);
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.INTERNAL_SERVER_ERROR.value(), "There is an error, sorry. Retry later. Error: "+e ));
        }
        ////////////////////////////////////////////////////////////////////////

       // return productService.getListOfProductsByUser(loginEntity);
        return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), productService.getListOfProductsByUser(loginEntity)));

    }



}
