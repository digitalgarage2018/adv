package it.iseed.daos;

import java.sql.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import javax.persistence.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.PurchaseEntity;
import it.iseed.entities.ServiceEntity;


@Repository
@Transactional
public class PurchaseDaoImpl implements PurchaseDao{

    @PersistenceContext
    public EntityManager entityManager;
	
	
	public ResponseEntity<JsonResponseBody> addPurchase(PurchaseEntity purchaseEntity){
		String query = "INSERT INTO purchase (pur_username,pur_serviceID, pur_date) VALUES (?, ?, ?);";
        try{
        entityManager.createNativeQuery(query)
                .setParameter(1,purchaseEntity.getPur_username())
                .setParameter(2,purchaseEntity.getPur_serviceID())
                .setParameter(3,purchaseEntity.getPur_date())
                .executeUpdate();

        return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.CREATED.value(), "Inserimento riuscito"));
        }catch (Exception e){

        	return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "Errore: "+e));
        }
	}
	
	
	public PurchaseEntity findPurchaseByDate(Date pur_date, long pur_serviceID){
		try{
	        Query selectOne = entityManager.createQuery("select distinct rr from PurchaseEntity rr where pur_date= ? and pur_serviceID= ?")
	        		.setParameter(1,pur_date)
	                .setParameter(2,pur_serviceID);
	        
	        PurchaseEntity prova = (PurchaseEntity) selectOne.getSingleResult();

	        return prova;
		}
		catch (NoResultException e){
			//System.out.println("Errore: "+e);
        	return null;
        }
	}
	
	
	public ServiceEntity getServiceById(long id) {
        try{
        	return entityManager.find(ServiceEntity.class, id);
        }
        catch (NoResultException e){
			//System.out.println("Errore: "+e);
        	return null;
        }
    }

	public List<PurchaseEntity> getInvalidDate(long id){
	    //search by service id in the purchase table
		Query selectAll = entityManager.createQuery("select  rr.pur_date from PurchaseEntity rr  where rr.pur_serviceID like :id").setParameter("id", id);
		return selectAll.getResultList();
	}
	
}
