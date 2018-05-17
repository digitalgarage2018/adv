package it.iseed.services;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import it.iseed.daos.PurchaseDao;
import it.iseed.daos.ServiceDao;
import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.PurchaseEntity;
import it.iseed.entities.ServiceEntity;

@Service 
public class PurchaseServiceImpl  implements PurchaseService {
	
	@Autowired
    private PurchaseDao purchaseDao;

	
	//add a purchase if the date of the service is not already in the table purchases in DB
	public ResponseEntity<JsonResponseBody> addPurchase(PurchaseEntity purchaseEntity){
		
		//ResponseEntity<JsonResponseBody> responseEntity;
		PurchaseEntity tmp=null;
		ServiceEntity tmp2=null;
		try {
			tmp  = purchaseDao.findPurchaseByDate(purchaseEntity.getPur_date(),purchaseEntity.getPur_serviceID());
			tmp2 = purchaseDao.getServiceById(purchaseEntity.getPur_serviceID());

			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			Date date = new Date();
			System.out.println("Today: "+dateFormat.format(date));
			System.out.println("Data inserita: "+purchaseEntity.getPur_date());
			//(purchaseEntity.getPur_date()).compareTo(date) < 0
			
			if((purchaseEntity.getPur_date()).compareTo(date) < 0){ // control of a valid date
	    		return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.METHOD_NOT_ALLOWED.value(), "You can't choose an expired date"));
	    	}else if(tmp2==null){	//control of the service's existance
	    		return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.METHOD_NOT_ALLOWED.value(), "This service doesn't exist"));
	    	}else if (tmp!=null ){	//control of date's disponibilty
				return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.METHOD_NOT_ALLOWED.value(), "Date already busy. Please choose another one"));
	    	}else {
				return this.purchaseDao.addPurchase(purchaseEntity);
	    	}
		}catch (Exception e){
        	return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "Errore: "+e));
        }
		//System.out.println("sono quiiiiii");
	}

	public List<PurchaseEntity> getInvalidDate() throws Exception{
		List<PurchaseEntity> ret = null;
		try {
			ret = this.purchaseDao.getInvalidDate();
		}catch (Exception e){
			throw new Exception("Impossibile raggiungere DB");
		}
		return ret;
	}


	
	
	
	/*	
	//add a purchase if the date of the service is not already in the table purchases in DB
		public ResponseEntity<JsonResponseBody> addPurchase(PurchaseEntity purchaseEntity){
			
			//ResponseEntity<JsonResponseBody> responseEntity;
			PurchaseEntity tmp=null;
			try {
				tmp = purchaseDao.findPurchaseByDate(purchaseEntity.getPur_date(),purchaseEntity.getPur_serviceID());
			}catch (Exception e){
	        	return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "Errore: "+e));
	        }
			System.out.println("sono quiiiiii");
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
		}*/

}
