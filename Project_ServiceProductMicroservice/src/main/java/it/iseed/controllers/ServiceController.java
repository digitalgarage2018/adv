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
import it.iseed.entities.ServiceEntity;
import it.iseed.entities.WellnessCenterEntity;
import it.iseed.services.ServiceService;
import it.iseed.utils.JwtUtils;

@CrossOrigin("*")

@RestController
public class ServiceController {

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
    ServiceService serviceService;

    @RequestMapping(value = "/services/{sr_name}", method = RequestMethod.GET,headers="Accept=application/json")
    public ResponseEntity<JsonResponseBody> searchServices(@PathVariable String sr_name) {
        try {
        	return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), serviceService.searchKeyWordService(sr_name)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "No connection DB"));
        }
    }

    @RequestMapping(value="/service/{sr_serviceID}", method = RequestMethod.GET,headers="Accept=application/json")
    public ServiceEntity getServiceById(@PathVariable long sr_serviceID) {
        return serviceService.getServiceById(sr_serviceID);
    }

    @RequestMapping(value = "/services/", method = RequestMethod.GET,headers="Accept=application/json")
    public ResponseEntity<JsonResponseBody> getListOfServices()
    {

        try {
        	return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), serviceService.getListOfServices()));
        }catch (Exception e){
         return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "No connection DB"));
        }
      

    }
    
    
    //Get the list of services linked to a Wellness Center by JWT
    @RequestMapping(value = "/servicesCenter/", method = RequestMethod.GET,headers="Accept=application/json")
    public ResponseEntity<JsonResponseBody> getListOfProductsByUser( HttpServletRequest request){

        WellnessCenterEntity centerEntity= new WellnessCenterEntity();
        /////////////////////////////////////////////////////////////////////////////
        String jwt = JwtUtils.getJwtFromHttpRequest(request);
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
        headers.add("jwt", jwt);
        HttpEntity<?> request_2 = new HttpEntity(String.class, headers);

        RestTemplate restTemplate = new RestTemplate();
        try {/////////////////////////////////////////////////////checkjwtcenter///////////////////////////get
            ResponseEntity<JsonResponseBody> responseEntity = restTemplate.exchange("http://localhost:8070/checkjwtcenter", HttpMethod.GET, request_2, JsonResponseBody.class);
            int answer = (int) responseEntity.getBody().getServer();
            if (answer!=200){
                return responseEntity;
            }
            else {
                LinkedHashMap user = (LinkedHashMap) responseEntity.getBody().getResponse();
                String name = (String) user.get("w_name");/////////////////////////name of wellness center
                centerEntity.setW_name(name);

            }
        }catch (Exception e){
            System.out.println("eccezione: " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new JsonResponseBody(HttpStatus.INTERNAL_SERVER_ERROR.value(), "There is an error, sorry. Retry later. Error: "+e ));
        }
        ////////////////////////////////////////////////////////////////////////

       // return productService.getListOfProductsByUser(loginEntity);
        return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), serviceService.getListOfServicesByCenter(centerEntity)));

    }

}
