package it.iseed.daos;

import java.util.List;

import it.iseed.entities.LoginEntity;
import it.iseed.entities.ProductEntity;


public interface ProductDao {

    public ProductEntity getProductById(long id);
    public List<ProductEntity> getListOfProducts();
    public List<ProductEntity> getListOfProductsByUser(LoginEntity loginEntity);



}
