package it.iseed.daos;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import it.iseed.entities.ServiceEntity;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public class ServiceDaoImpl implements ServiceDao {


    @PersistenceContext
    public EntityManager entityManager;
    //private static final String SELECT_ALL = "select * from SERVICES order by sr_name";
    //private static final String SEARCH_BY_NAME = "select * from SERVICES where lower(sr_name) like ? ";
    //private static final String SEARCH_BY_KEYWORD = "select * from SERVICES where sr_name LIKE ?";
    //private static final String SELECT_ALL = "select * from SERVICES";

    public List<ServiceEntity> printServices()  {
      //  List<ServiceEntity> serviceList = new List<ServiceEntity>();
        Query selectAll = entityManager.createQuery("select rr from ServiceEntity rr order by sr_name");
        return /*(List<ServiceEntity>)*/ selectAll.getResultList();
       // return (("select rr from ServiceEntity rr order by sr_name") selectAll).getResultList();
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
}
