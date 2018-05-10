package it.iseed.controllers;

import it.iseed.entities.ServiceEntity;
import it.iseed.services.WellnessCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class WellnessCenterController {
    @Autowired
    WellnessCenterService wellnessCenterService;

    @RequestMapping(value = "/addService", method = RequestMethod.POST,headers = "Accept=application/json")
    public ResponseEntity<Void> addService(@RequestBody ServiceEntity serviceEntity){
         return  wellnessCenterService.addService(serviceEntity);
    }

    @RequestMapping(value = "/updateService/{sr_serviceID}", method = RequestMethod.PUT,headers = "Accept=application/json")
    public ResponseEntity<Void> updateService(@PathVariable long sr_serviceID,@RequestBody ServiceEntity serviceEntity){


        System.out.println("controller: dopo la getservicebyid");
        serviceEntity.setSr_serviceID(sr_serviceID);
System.out.println("id del servi e id --->" + serviceEntity.getSr_serviceID()



);
         return  wellnessCenterService.updateService(serviceEntity);
    }

}
