package it.iseed.daos;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import it.iseed.entities.ProductEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.CannotCreateTransactionException;



@Repository
@Transactional
public class ProductDaoImpl implements ProductDao {

    @PersistenceContext
    public EntityManager entityManager;
/*
    public List<ProductEntity> printProducts() throws CannotCreateTransactionException {

        Query selectAll = entityManager.createQuery("select rr from ProductEntity rr order by p_name");

        return /*(List<ProductEntity>)selectAll.getResultList();
    }*/

    public ProductEntity getProductById(long id) {
        return entityManager.find(ProductEntity.class, id);

    }

    public List<ProductEntity> getListOfProducts(){

        Query selectAll = entityManager.createQuery("select rr from ProductEntity rr order by p_name");

        return selectAll.getResultList();



    }

}
