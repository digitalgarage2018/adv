package it.iseed.daos;

import java.sql.Date;

import org.springframework.http.ResponseEntity;

import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.PurchaseEntity;
import it.iseed.entities.ServiceEntity;

public interface PurchaseDao {
	public ResponseEntity<JsonResponseBody> addPurchase(PurchaseEntity purchaseEntity);
	public PurchaseEntity findPurchaseByDate(Date pur_date, long pur_serviceID);
	public ServiceEntity getServiceById(long pur_serviceID);	
}
