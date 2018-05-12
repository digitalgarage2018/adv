package it.iseed.daos;

import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.ServiceEntity;
import org.springframework.http.ResponseEntity;

public interface WellnessCenterDao {
    public ResponseEntity<JsonResponseBody> addService(ServiceEntity serviceEntity);
    public ResponseEntity<JsonResponseBody> updateService(ServiceEntity serviceEntity);


}
