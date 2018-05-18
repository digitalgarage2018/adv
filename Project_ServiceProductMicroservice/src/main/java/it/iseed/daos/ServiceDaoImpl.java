package it.iseed.daos;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import it.iseed.entities.ServiceEntity;
import it.iseed.entities.WellnessCenterEntity;

@Repository
@Transactional
public class ServiceDaoImpl implements ServiceDao {

    @PersistenceContext
    public EntityManager entityManager;

    public List<ServiceEntity> printServices()  {
        Query selectAll = entityManager.createQuery("select rr from ServiceEntity rr order by sr_name");
        return selectAll.getResultList();
    }

    public List<ServiceEntity> searchKeyWord(String keyword) {
        String query = "select c from ServiceEntity c where c.sr_name LIKE :prova";
        String key = "%" + keyword + "%";
        System.out.println("Esecuzione query su" + keyword);
        return entityManager.createQuery(query).setParameter("prova", key).getResultList();
        }

    public ServiceEntity getServiceById(long id) {
        return entityManager.find(ServiceEntity.class, id);
    }

    public List<ServiceEntity> getListOfServices(){
        Query selectAll = entityManager.createQuery("select rr from ServiceEntity rr order by sr_name");
        return selectAll.getResultList();
    }
    
    //Get the list of services linked to a Wellness Center
    public List<ServiceEntity> getListOfServicesByCenter(WellnessCenterEntity centerEntity){
        String center = centerEntity.getW_name();
        System.out.println("il servizio è:"+center);
        String  query ="select distinct p from ServiceEntity p  where :center = p.sr_wellness_center";
        return entityManager.createQuery(query).setParameter("center", center).getResultList();

    }
}
