package it.iseed.daos;

import java.sql.Date;

import org.springframework.http.ResponseEntity;

import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.PurchaseEntity;

public interface PurchaseDao {
	public ResponseEntity<JsonResponseBody> addPurchase(PurchaseEntity purchaseEntity);
	public PurchaseEntity findPurchaseByDate(Date pur_date, long pur_serviceID);	
}
