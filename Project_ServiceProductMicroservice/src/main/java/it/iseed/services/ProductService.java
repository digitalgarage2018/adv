package it.iseed.services;


import it.iseed.entities.LoginEntity;
import it.iseed.entities.ProductEntity;

import java.util.List;

public interface ProductService {
    public ProductEntity getProductById(long id);
    public List<ProductEntity> getListOfProducts();
    public List<ProductEntity> getListOfProductsByUser(LoginEntity loginEntity);


}
