package it.iseed.controllers;

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

import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.LoginEntity;
import it.iseed.entities.ProductEntity;
import it.iseed.services.ProductService;
import it.iseed.utils.JwtUtils;

@CrossOrigin("*")

@RestController
public class ProductController {

//******LEGENDA STATUS COMUNICATI AL CLIENT
////////
////////OK->200->success
////////FORBIDDEN->403->errore di login e/o jwt errata
////////NOT_ACCEPTABLE->406->you have no permission to do this
////////PRECONDITION_FAILED->412->token con formato errato
////////SERVICE_UNAVAILABLE->503->no db connection
////////NOT_IMPLEMENTED->501->errore generico
////////GATEWAY_TIMEOUT->504->session expired
////////
//******FINE LEGENDA
	
    @Autowired
    ProductService productService;

/*
    @RequestMapping(value="/products/{p_product_id}", method = RequestMethod.GET,headers="Accept=application/json")
    public ProductEntity getProductById(@PathVariable long p_product_id) {

        return productService.getProductById(p_product_id);
    }

    
    
    @RequestMapping(value = "/products/", method = RequestMethod.GET,headers="Accept=application/json")
    public ResponseEntity<JsonResponseBody> getListOfProducts(HttpServletRequest request)  {

    	String jwt = JwtUtils.getJwtFromHttpRequest(request);
    	MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
       
        headers.add("jwt", jwt);
        HttpEntity<?> request_2 = new HttpEntity(String.class, headers);
        RestTemplate restTemplate = new RestTemplate();

        try {
        	ResponseEntity<JsonResponseBody> responseEntity = restTemplate.exchange("http://localhost:8070/checkjwtuser", HttpMethod.POST, request_2, JsonResponseBody.class);
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
        	return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.INTERNAL_SERVER_ERROR.value(), "There is an error, sorry. Retry later. Error: "+e ));
        }
        System.out.println("sono tra le due try: ");
    	try {
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), productService.getListOfProducts()));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "No connection DB"));
        }
    }
    */

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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new JsonResponseBody(HttpStatus.INTERNAL_SERVER_ERROR.value(), "There is an error, sorry. Retry later. Error: "+e ));
        }
        ////////////////////////////////////////////////////////////////////////

       // return productService.getListOfProductsByUser(loginEntity);
        return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), productService.getListOfProductsByUser(loginEntity)));

    }



}
