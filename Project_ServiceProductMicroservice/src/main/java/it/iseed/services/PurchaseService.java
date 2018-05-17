package it.iseed.services;

import org.springframework.http.ResponseEntity;

import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.PurchaseEntity;
import it.iseed.entities.ServiceEntity;

import java.util.List;

public interface PurchaseService {
	public ResponseEntity<JsonResponseBody> addPurchase(PurchaseEntity purchaseEntity);
	public List<PurchaseEntity> getInvalidDate() throws Exception;
}
