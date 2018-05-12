package it.iseed.services;

import it.iseed.daos.WellnessCenterDao;
import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.ServiceEntity;

import javax.persistence.RollbackException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class WellnessCenterServiceImpl implements WellnessCenterService{

    @Autowired
    private WellnessCenterDao wellnessCenterDao;

    public ResponseEntity<JsonResponseBody> addService(ServiceEntity serviceEntity){

        try {return this.wellnessCenterDao.addService(serviceEntity);}
        catch (Exception e){
        	return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "Errore: "+e));
        }
    }
    
    public ResponseEntity<JsonResponseBody> updateService(ServiceEntity serviceEntity){
    	
    	try {return this.wellnessCenterDao.updateService(serviceEntity);}
        catch (Exception e){
        	return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "Errore: "+e));
        }
    }
}
