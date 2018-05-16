package it.iseed.daos;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import javax.persistence.Entity;

import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.LoginEntity;
import it.iseed.entities.ProductEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.CannotCreateTransactionException;



@Repository
@Transactional
public class ProductDaoImpl implements ProductDao {

    @PersistenceContext
    public EntityManager entityManager;

    public ProductEntity getProductById(long id) {
        return entityManager.find(ProductEntity.class, id);

    }

    public List<ProductEntity> getListOfProducts(){
        Query selectAll = entityManager.createQuery("select rr from ProductEntity rr order by p_name");
        return selectAll.getResultList();
    }

    public List<ProductEntity> getListOfProductsByUser(LoginEntity loginEntity){
        String username = loginEntity.getUsername();
        System.out.println("l'username è:"+username);
        String  query ="select distinct p from ProductEntity p  , PurchaseEntity q where :username = q.pur_username and p.p_serv_id = q.pur_serviceID";
        return entityManager.createQuery(query).setParameter("username", username).getResultList();

    }
}
