package it.iseed.entities;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table (name = "products")
public class ProductEntity implements Serializable {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long p_product_id;

    @NotEmpty
    @Column(name="p_name", nullable=false)
    private String p_name;

    @NotEmpty
    @Column(name="p_description", nullable=false)
    private String p_description;

    @NotEmpty
    @Column(name="p_service", nullable=false)
    private String p_service;

    @NotEmpty
    @Column(name="p_image", nullable=false)
    private String p_image;

    @NotEmpty
    @Column(name="p_price", nullable=false)
    private int p_price;

    public long getP_product_id() {
        return p_product_id;
    }

    public void setP_product_id(long p_product_id) {
        this.p_product_id = p_product_id;
    }

    public String getP_name() {
        return p_name;
    }

    public void setP_name(String p_name) {
        this.p_name = p_name;
    }

    public String getP_description() {
        return p_description;
    }

    public void setP_description(String p_description) {
        this.p_description = p_description;
    }

    public String getP_service() {
        return p_service;
    }

    public void setP_service(String p_service) {
        this.p_service = p_service;
    }

    public String getP_image() {
        return p_image;
    }

    public void setP_image(String p_image) {
        this.p_image = p_image;
    }

    public int getP_price() {
        return p_price;
    }

    public void setP_price(int p_price) {
        this.p_price = p_price;
    }
}
