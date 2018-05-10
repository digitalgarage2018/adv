package it.iseed.services;

import it.iseed.daos.ServiceDao;
import it.iseed.entities.ServiceEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

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

    public List<ServiceEntity> searchKeyWordService(String keyword) {

        List<ServiceEntity> result = null;
        try {
            result = serviceDao.searchKeyWord(keyword);
            System.out.println("nel service la keyword è "+keyword);
        } catch (Exception e) {
        	System.out.println("Errore SQL: "+e);
            //e.printStackTrace();
        }
        return result;
    }

    public ServiceEntity getServiceById(long id)  {
/*
    	List<ProductEntity> result = null;
    	try{
    		result = productDao.printProducts();
    	} catch (CannotCreateTransactionException e){
    		System.out.println("errore exec: "+e);
    	}

        if(result == null)
            System.out.println("lista prodotti nulla");
*/
        return this.serviceDao.getServiceById(id);

    }

    public List<ServiceEntity> getListOfServices(){
        return this.serviceDao.getListOfServices();
    }


}
