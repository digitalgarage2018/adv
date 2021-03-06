package it.iseed.services;


import it.iseed.entities.ServiceEntity;

import java.util.List;

public interface ServiceService {
    public List<ServiceEntity> getServiceService();
    public List<ServiceEntity> searchKeyWordService(String keyword) throws Exception;
    public ServiceEntity getServiceById(long id);
    public List<ServiceEntity> getListOfServices() throws  Exception;


}
