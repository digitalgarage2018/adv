package it.iseed.entities;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;
import java.util.Set;

@Entity
@Table (name = "services")
public class ServiceEntity implements Serializable {

    /*Bidirectional relation between users and services*/
    /*So now we know who has purchased a service*/
   // @ManyToMany(mappedBy = "listServices")
  //  private List<LoginEntity> listUsers;
/*
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "USER_SERVICE",
    joinColumns = {@JoinColumn(name = "UID", referencedColumnName = "u_username")}
            inverseJoinColumns={@JoinColumn(name="SID", referencedColumnName="sr_serviceID)})
    private LoginEntity ser;
*/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="sr_serviceID", nullable = false)
    private long sr_serviceID;
    /*N.B. adding @manytomany for the bidirectional relation between users and services*/
/*
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @OneToMany(cascade=CascadeType.ALL)
    @JoinColumn(name="sr_serviceID")
    private Set<PurchaseServEntity> purchServ_;
*/
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
/*
    @ManyToMany
    private List<ProductEntity> productList;

    @ManyToMany(mappedBy = "serviceList")
    private List<LoginEntity> userList;*/




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



