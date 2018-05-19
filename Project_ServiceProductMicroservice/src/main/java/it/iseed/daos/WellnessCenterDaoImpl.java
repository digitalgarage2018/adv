package it.iseed.daos;

import it.iseed.entities.JsonResponseBody;
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

    public ResponseEntity<JsonResponseBody> addService(ServiceEntity serviceEntity) throws PersistenceException,CannotCreateTransactionException {
        String query = "INSERT INTO services (sr_description,sr_image, sr_name,sr_price, sr_time, sr_type, sr_wellness_center) VALUES (?, ?, ?, ?, ?, ?, ?);";
        try{
        entityManager.createNativeQuery(query)
                .setParameter(1,serviceEntity.getSr_description())
                .setParameter(2,serviceEntity.getSr_image())
                .setParameter(3,serviceEntity.getSr_name())
                .setParameter(4,serviceEntity.getSr_price())
                .setParameter(5,serviceEntity.getSr_time())
                .setParameter(6,serviceEntity.getSr_type())
                .setParameter(7,serviceEntity.getSr_wellness_center())
                .executeUpdate();

        return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.CREATED.value(), "Inserimento riuscito"));
        }catch (Exception e){
        	return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "Errore: "+e));
        }
    }
    
    
    public ResponseEntity<JsonResponseBody> updateService(ServiceEntity serviceEntity){

    	String query = "UPDATE services SET sr_description = ?, sr_image = ?, sr_name = ?, sr_price = ?, sr_time = ?, sr_type = ? WHERE sr_serviceID = ?;";
        try{
        entityManager.createNativeQuery(query)
                .setParameter(1,serviceEntity.getSr_description())
                .setParameter(2,serviceEntity.getSr_image())
                .setParameter(3,serviceEntity.getSr_name())
                .setParameter(4,serviceEntity.getSr_price())
                .setParameter(5,serviceEntity.getSr_time())
                .setParameter(6,serviceEntity.getSr_type())
                .setParameter(7,serviceEntity.getSr_serviceID())
                .executeUpdate();
 		
        return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.CREATED.value(), "Aggiornamento riuscito"));
        }catch(Exception e){
        	return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "Errore: "+e));
        }
    }
    
    public void deleteService(long sr_serviceID){
    	String query = "delete from services where sr_serviceID = ?";
		 entityManager.createNativeQuery(query)
		    .setParameter(1, sr_serviceID)
		    .executeUpdate();
		 System.out.println("Eliminato servizio con ID: "+sr_serviceID);
    }

}
