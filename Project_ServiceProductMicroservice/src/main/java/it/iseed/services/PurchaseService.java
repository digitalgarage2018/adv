package it.iseed.services;

import org.springframework.http.ResponseEntity;

import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.PurchaseEntity;
import it.iseed.entities.ServiceEntity;

public interface PurchaseService {
	public ResponseEntity<JsonResponseBody> addPurchase(PurchaseEntity purchaseEntity);
}
