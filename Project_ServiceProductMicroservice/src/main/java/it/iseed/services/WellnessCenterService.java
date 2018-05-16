package it.iseed.services;

import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.ServiceEntity;
import org.springframework.http.ResponseEntity;

public interface WellnessCenterService {
    public ResponseEntity<JsonResponseBody> addService(ServiceEntity serviceEntity);
    public ResponseEntity<JsonResponseBody> updateService(ServiceEntity serviceEntity);
}
