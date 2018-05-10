package it.iseed.daos;

import it.iseed.entities.ServiceEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.CannotCreateTransactionException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.transaction.Transactional;

@Repository
@Transactional
public class WellnessCenterDaoImpl implements WellnessCenterDao{

    @PersistenceContext
    public EntityManager entityManager;

    public ResponseEntity<Void> addService(ServiceEntity serviceEntity) throws PersistenceException,CannotCreateTransactionException {
        String query = "INSERT INTO services (sr_description,sr_image, sr_name,sr_price, sr_time, sr_type, sr_wellness_center) VALUES (?, ?, ?, ?, ?, ?, ?);";
        entityManager.createNativeQuery(query)
                .setParameter(1,serviceEntity.getSr_description())
                .setParameter(2,serviceEntity.getSr_image())
                .setParameter(3,serviceEntity.getSr_name())
                .setParameter(4,serviceEntity.getSr_price())
                .setParameter(5,serviceEntity.getSr_time())
                .setParameter(6,serviceEntity.getSr_type())
                .setParameter(7,serviceEntity.getSr_wellness_center())
                .executeUpdate();

        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }
}
