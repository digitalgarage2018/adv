package it.iseed.daos;

import java.util.List;

import it.iseed.entities.ProductEntity;
import org.springframework.transaction.CannotCreateTransactionException;


public interface ProductDao {

    public ProductEntity getProductById(long id);
    public List<ProductEntity> getListOfProducts();


}
