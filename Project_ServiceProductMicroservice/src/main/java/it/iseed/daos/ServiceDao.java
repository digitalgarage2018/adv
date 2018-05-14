package it.iseed.daos;

import java.util.List;

import it.iseed.entities.ServiceEntity;

public interface ServiceDao {
    //public boolean authenticateUser(LoginEntity loginBean);
    public List<ServiceEntity> printServices();
    public List<ServiceEntity> searchKeyWord(String keyword);
    public ServiceEntity getServiceById(long id);
    public List<ServiceEntity> getListOfServices();


}
