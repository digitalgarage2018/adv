package it.iseed.services;


import java.util.List;

import it.iseed.daos.ProductDao;
import it.iseed.entities.LoginEntity;
import it.iseed.entities.ProductEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ProductServiceImpl  implements  ProductService{

    @Autowired
    ProductDao productDao;

    public ProductEntity getProductById(long id)  {
/*
    	List<ProductEntity> result = null;
    	try{ 
    		result = productDao.printProducts();
    	} catch (CannotCreateTransactionException e){
    		System.out.println("errore exec: "+e);
    	}

        if(result == null)
            System.out.println("lista prodotti nulla");
*/
        return this.productDao.getProductById(id);

    }

    public List<ProductEntity> getListOfProducts(){
        return this.productDao.getListOfProducts();
    }

    public List<ProductEntity> getListOfProductsByUser(LoginEntity loginEntity){
   //  try {
         return this.productDao.getListOfProductsByUser(loginEntity);
     //}  catch (Exception e){
            // return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "Errore: "+e));
    //}

}
}
