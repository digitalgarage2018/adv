package it.iseed.services;

import it.iseed.entities.ServiceEntity;
import org.springframework.http.ResponseEntity;

public interface WellnessCenterService {
    public ResponseEntity<Void> addService(ServiceEntity serviceEntity);
}
