package it.iseed.services;

import it.iseed.daos.WellnessCenterDao;
import it.iseed.entities.ServiceEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class WellnessCenterServiceImpl implements WellnessCenterService{

    @Autowired
    private WellnessCenterDao wellnessCenterDao;

    public ResponseEntity<Void> addService(ServiceEntity serviceEntity){
        return this.wellnessCenterDao.addService(serviceEntity);
    }
}
