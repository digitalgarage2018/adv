package it.iseed.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import it.iseed.entities.ServiceEntity;
import it.iseed.services.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;



@RestController
public class ServiceController {

    @Autowired
    ServiceService serviceService;


    @RequestMapping(value = "serviceController", method = RequestMethod.GET)
    public ModelAndView getServices(HttpServletRequest request) {

        //  ServiceEntity serviceBean = new ServiceEntity();
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
    public List<ServiceEntity> searchServices(@PathVariable String sr_name) {

        ModelAndView model = new ModelAndView();

        String keyword = sr_name;
        
        List<ServiceEntity> serviceList = null;
        System.out.println(sr_name +"   questa è LA CHIAVE DI RICERCA ");
        
        System.out.println("chiave di ricerca:||"+sr_name+"||");
        //if (keyword!=null &&  keyword.trim().length() > 0){
        if (sr_name.equals("all")){
        	serviceList = serviceService.getServiceService();
        	//serviceList = serviceService.searchKeyWordService(keyword);
        }
        else {
        	serviceList = serviceService.searchKeyWordService(sr_name);
        	//serviceList = serviceService.getServiceService();
        }

        return serviceList;
    }


    @RequestMapping(value="/service/{sr_serviceID}", method = RequestMethod.GET,headers="Accept=application/json")
    public ServiceEntity getServiceById(@PathVariable long sr_serviceID) {
        return serviceService.getServiceById(sr_serviceID);
    }

    @RequestMapping(value = "/services/", method = RequestMethod.GET,headers="Accept=application/json")
    public List<ServiceEntity> getListOfServices()
    {

        return serviceService.getListOfServices();
    }

    /*
	private List<ServiceBean> serviceList;
	private String searchServices;

    public String getSearchServices() {
		return searchServices;
	}

	public void setSearchServices(String searchServices) {
		this.searchServices = searchServices;
	}*/
/*

public void loadServices() {

		System.out.println("ENTRO LOAD");
        serviceList.clear();

        try {
            if (searchServices != null && searchServices.trim().length() > 0) {
                // search for services by name
                serviceList = ServiceDao.searchService(searchServices);
            }
            else {
                // get all services from database
                serviceList = ServiceDao.getServices();
            }

        } catch (Exception exc) {
            // send this to server logs
          //  logger.log(Level.SEVERE, "Error loading services", exc);

            // add error message

        }
        finally {
            // reset the search info
            searchServices = null;
        }
    }*/
}
