package it.iseed.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table (name = "services")
public class ServiceEntity implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="sr_serviceID", nullable = false)
    private long sr_serviceID;

    @NotEmpty
    @Column(name="sr_type", nullable=false)
    private String sr_type;

    @NotEmpty
    @Column(name="sr_description", nullable=false)
    private String sr_description;

    @NotNull
    @Column(name="sr_price", nullable=false)
    private int sr_price;

    @NotNull
    @Column(name="sr_time")
    private int sr_time;

    @NotEmpty
    @Column(name="sr_wellness_center", nullable=false)
    private String sr_wellness_center;

    @NotEmpty
    @Column(name="sr_image", nullable=false)
    private String sr_image;

    @NotEmpty
    @Column(name="sr_name", nullable=false)
    private String sr_name;


    public String getSr_name() {
        return sr_name;
    }

    public void setSr_name(String sr_name) {
        this.sr_name = sr_name;
    }

    public String getSr_type() {
        return sr_type;
    }

    public void setSr_type(String sr_type) {
        this.sr_type = sr_type;
    }

    public String getSr_wellness_center() {
        return sr_wellness_center;
    }

    public void setSr_wellness_center(String sr_wellness_center) {
        this.sr_wellness_center = sr_wellness_center;
    }

    public String getSr_image() {
        return sr_image;
    }

    public void setSr_image(String sr_image) {
        this.sr_image = sr_image;
    }

    public String getSr_description() {
        return sr_description;
    }

    public void setSr_description(String sr_description) {
        this.sr_description = sr_description;
    }

    public int getSr_price() {
        return sr_price;
    }

    public void setSr_price(int sr_price) {
        this.sr_price = sr_price;
    }

    public int getSr_time() {
        return sr_time;
    }

    public void setSr_time(int sr_time) {
        this.sr_time = sr_time;
    }

    public long getSr_serviceID() {
        return sr_serviceID;
    }

    public void setSr_serviceID(long sr_serviceID) {
        this.sr_serviceID = sr_serviceID;
    }
}



