package it.iseed.controllers;

import it.iseed.entities.ProductEntity;
import it.iseed.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
public class ProductController {

    @Autowired
    ProductService productService;


    @RequestMapping(value="/products/{p_product_id}", method = RequestMethod.GET,headers="Accept=application/json")
    public ProductEntity getProductById(@PathVariable long p_product_id) {

/*
        List<ProductEntity> productList = productService.getProducts();

        if(productList != null){
            model.addObject("products", productList);
        }
        else {
            request.setAttribute("errorMessage", "Errore connessione database. Riprova più tardi");
        }
        model.setViewName("product_list");
*/
        return productService.getProductById(p_product_id);
    }

    @RequestMapping(value = "/products/", method = RequestMethod.GET,headers="Accept=application/json")
    public List<ProductEntity> getListOfProducts(){

        return productService.getListOfProducts();

    }



}
