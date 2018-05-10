package it.iseed.daos;

import it.iseed.entities.ServiceEntity;
import org.springframework.http.ResponseEntity;

public interface WellnessCenterDao {
    public ResponseEntity<Void> addService(ServiceEntity serviceEntity);
    public ResponseEntity<Void> updateService(ServiceEntity serviceEntity);


}
