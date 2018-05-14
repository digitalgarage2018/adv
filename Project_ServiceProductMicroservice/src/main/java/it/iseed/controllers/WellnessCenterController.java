package it.iseed.controllers;

import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.ServiceEntity;
import it.iseed.services.ServiceService;
import it.iseed.services.WellnessCenterService;

import java.net.ConnectException;
import java.util.LinkedHashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import it.iseed.utils.JwtUtils;


@RestController
public class WellnessCenterController {
    @Autowired
    WellnessCenterService wellnessCenterService;
    
    @Autowired
    ServiceService ServiceService;

    @RequestMapping(value = "/addService", method = RequestMethod.POST,headers = "Accept=application/json")
    public ResponseEntity<JsonResponseBody> addService(@RequestBody ServiceEntity serviceEntity, HttpServletRequest request){
    	
    	String jwt = JwtUtils.getJwtFromHttpRequest(request);
    	MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
        headers.add("jwt", jwt);
        HttpEntity<?> request_2 = new HttpEntity(String.class, headers);

        RestTemplate restTemplate = new RestTemplate();
        if (serviceEntity.getSr_price() != 0 &&
                serviceEntity.getSr_name() != "" &&
                serviceEntity.getSr_description()!= "" &&
                serviceEntity.getSr_time() != 0&&
                serviceEntity.getSr_type() != "")
        {
        try {
        	ResponseEntity<JsonResponseBody> responseEntity = restTemplate.exchange("http://localhost:8070/checkjwtcenter", HttpMethod.POST, request_2, JsonResponseBody.class);
        	int answer = (int) responseEntity.getBody().getServer();
        	if (answer!=200){
        		return responseEntity;
        	}
        	else {
        	LinkedHashMap center = (LinkedHashMap) responseEntity.getBody().getResponse();
        	String name = (String) center.get("w_name");
        	serviceEntity.setSr_wellness_center(name);
        	
        	}
        }catch (Exception e){
        	System.out.println("eccezione: " + e);
        	return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.INTERNAL_SERVER_ERROR.value(), "There is an error, sorry. Retry later. Error: "+e ));
        }
        
        return wellnessCenterService.addService(serviceEntity);
        }else{
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JsonResponseBody(HttpStatus.FORBIDDEN.value(), "I campi devono tutti essere valorizzati: "));

        }
    }
    

    @RequestMapping(value = "/updateService/{sr_serviceID}", method = RequestMethod.PUT,headers = "Accept=application/json")
    public ResponseEntity<JsonResponseBody> updateService(@PathVariable long sr_serviceID,@RequestBody ServiceEntity serviceEntity, HttpServletRequest request) {

        String jwt = JwtUtils.getJwtFromHttpRequest(request);
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
        headers.add("jwt", jwt);
        HttpEntity<?> request_2 = new HttpEntity(String.class, headers);
        String name = null;

        RestTemplate restTemplate = new RestTemplate();
        if (serviceEntity.getSr_price() != 0 &&
                serviceEntity.getSr_name() != "" &&
                serviceEntity.getSr_description()!= "" &&
                serviceEntity.getSr_time() != 0&&
                serviceEntity.getSr_type() != "")
        {

                try {
                    ResponseEntity<JsonResponseBody> responseEntity = restTemplate.exchange("http://localhost:8070/checkjwtcenter", HttpMethod.POST, request_2, JsonResponseBody.class);
                    int answer = (int) responseEntity.getBody().getServer();
                    if (answer != 200) {
                        return responseEntity;
                    } else {
                        LinkedHashMap center = (LinkedHashMap) responseEntity.getBody().getResponse();
                        //String name = (String) center.get("w_username");
                        name = (String) center.get("w_name");
                        serviceEntity.setSr_wellness_center(name);

                    }
                } catch (Exception e) {
                    System.out.println("eccezione: " + e);
                    return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.INTERNAL_SERVER_ERROR.value(), "There is an error, sorry. Retry later. Error: " + e));
                }
                ServiceEntity serviceTmp = null;
                try {
                    //TODO potrei trasformarlo in responseEntity, così da gestirlo meglio
                    serviceTmp = ServiceService.getServiceById(sr_serviceID);
                    //
                } catch (Exception e) {
                    System.out.println("eccezione: " + e);
                    return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.INTERNAL_SERVER_ERROR.value(), "There is an error, sorry. Retry later. Error: " + e));
                }
                System.out.println("nome del centro del servizio da modificare: |" + name + "!");
                System.out.println("nome del centro del servizio che modifica: |" + serviceTmp.getSr_wellness_center() + "!");
                if (name.equals(serviceTmp.getSr_wellness_center())) {
                    System.out.println("richiamo l'update");
                    serviceEntity.setSr_serviceID(sr_serviceID);
                    return wellnessCenterService.updateService(serviceEntity);
                } else {
                    return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.NOT_ACCEPTABLE.value(), "You have no permissions to do this: "));
                }

        }else{
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JsonResponseBody(HttpStatus.FORBIDDEN.value(), "I campi devono tutti essere valorizzati: "));

        }
    }

}
