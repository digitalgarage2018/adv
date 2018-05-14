package it.iseed.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.ServiceEntity;
import it.iseed.services.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;



@RestController
public class ServiceController {

    @Autowired
    ServiceService serviceService;


    @RequestMapping(value = "serviceController", method = RequestMethod.GET)
    public ModelAndView getServices(HttpServletRequest request) {

        ModelAndView model = new ModelAndView();

        List<ServiceEntity> serviceList = serviceService.getServiceService();
        if (serviceList != null) {
            model.addObject("services", serviceList); // Will be available as ${products} in JSP
        } else {
            request.setAttribute("errorMessage", "Errore connessione database. Riprova più tardi");
        }
        //  request.getRequestDispatcher("/service_list.jsp").forward(request, response);
        model.setViewName("service_list");

        return model;

    }

    @RequestMapping(value = "searchServices/{sr_name}", method = RequestMethod.POST,headers="Accept=application/json")
    public ResponseEntity<JsonResponseBody> searchServices(@PathVariable String sr_name) throws  Exception {
        try {
            serviceService.searchKeyWordService(sr_name);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "No connection DB"));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), serviceService.searchKeyWordService(sr_name)));


    }

    @RequestMapping(value="/service/{sr_serviceID}", method = RequestMethod.GET,headers="Accept=application/json")
    public ServiceEntity getServiceById(@PathVariable long sr_serviceID) {
        return serviceService.getServiceById(sr_serviceID);
    }

    @RequestMapping(value = "/services/", method = RequestMethod.GET,headers="Accept=application/json")
    public ResponseEntity<JsonResponseBody> getListOfServices() throws Exception
    {

        try {
            serviceService.getListOfServices();
        }catch (Exception e){
         return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "No connection DB"));
        }

        return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), serviceService.getListOfServices()));

    }

}
