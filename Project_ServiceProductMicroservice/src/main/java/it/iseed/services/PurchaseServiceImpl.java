package it.iseed.services;

import java.util.LinkedHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import it.iseed.daos.PurchaseDao;
import it.iseed.daos.WellnessCenterDao;
import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.PurchaseEntity;

@Service 
public class PurchaseServiceImpl  implements PurchaseService {
	
	@Autowired
    private PurchaseDao purchaseDao;
	
	//add a purchase if the date of the service is not already in the table purchases in DB
	public ResponseEntity<JsonResponseBody> addPurchase(PurchaseEntity purchaseEntity){
		
		ResponseEntity<JsonResponseBody> responseEntity;
		PurchaseEntity tmp=null;
		try {
			tmp = purchaseDao.findPurchaseByDate(purchaseEntity.getPur_date(),purchaseEntity.getPur_serviceID());
		}catch (Exception e){
        	return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "Errore: "+e));
        }
		if (tmp!=null){
			
    		return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.METHOD_NOT_ALLOWED.value(), "Date already busy. Please choose another one"));
    	}else {

			try {
				return this.purchaseDao.addPurchase(purchaseEntity);
				}
	        catch (Exception e){
	        	return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "Errore: "+e));
	        }
    	}
	}

}
