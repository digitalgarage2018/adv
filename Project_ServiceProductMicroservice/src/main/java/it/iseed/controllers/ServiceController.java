package it.iseed.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.ServiceEntity;
import it.iseed.services.ServiceService;


@CrossOrigin("*")

@RestController
public class ServiceController {

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

}
