package it.iseed.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.iseed.daos.ServiceDao;
import it.iseed.entities.ServiceEntity;
import it.iseed.entities.WellnessCenterEntity;

@Service
public class ServiceServiceImpl implements ServiceService {

    @Autowired
    ServiceDao serviceDao;

    public List<ServiceEntity> getServiceService()  {

        List<ServiceEntity> result = null;
        try{
        	result = serviceDao.printServices();
        } catch (Exception e){
        	System.out.println("Errore SQL: "+e);
        }
        return result;
    }

    public List<ServiceEntity> searchKeyWordService(String keyword) throws  Exception {

        List<ServiceEntity> result = null;
        try {
            result = serviceDao.searchKeyWord(keyword);
            System.out.println("nel service la keyword è "+keyword);
        } catch (Exception e) {
        	System.out.println("Errore SQL: "+e);
        	throw new Exception(" Impossibile raggiungere il DB");
            //e.printStackTrace();
        }
        return result;
    }

    public ServiceEntity getServiceById(long id)  {
        return this.serviceDao.getServiceById(id);

    }

    public List<ServiceEntity> getListOfServices() throws Exception {
        List<ServiceEntity>  ret = null;
        try {
          ret = this.serviceDao.getListOfServices();
        }catch (Exception e){
            throw new Exception("Impossibile raggiungere DB");
        }
        return ret;
    }
    
    //Get the list of services linked to a Wellness Center
    public List<ServiceEntity> getListOfServicesByCenter(WellnessCenterEntity centerEntity){
        return this.serviceDao.getListOfServicesByCenter(centerEntity);

    }

}
