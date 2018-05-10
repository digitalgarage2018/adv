package it.iseed.entities;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "purchase")
public class PurchaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long pur_purchaseID;
/*
    @ManyToMany
    private LoginEntity users;

    @ManyToMany
    private ServiceEntity services;
*/
    @NotEmpty
    @Column(name="pur_userID", nullable=false)
    private String pur_userID;

    @NotEmpty
    @Column(name="pur_serviceID", nullable=false)
    private String pur_serviceID;

    public long getPur_purchaseID() {
        return pur_purchaseID;
    }

    public void setPur_purchaseID(long pur_purchaseID) {
        this.pur_purchaseID = pur_purchaseID;
    }

    public String getPur_userID() {
        return pur_userID;
    }

    public void setPur_userID(String pur_userID) {
        this.pur_userID = pur_userID;
    }

    public String getPur_serviceID() {
        return pur_serviceID;
    }

    public void setPur_serviceID(String pur_serviceID) {
        this.pur_serviceID = pur_serviceID;
    }

   /*
    public LoginEntity getUsers() {
        return users.getUsername();
    }

    public void setUsers(LoginEntity users) {
        this.users = users;
    }

    public ServiceEntity getServices() {
        return services.getSr_serviceID();
    }

    public void setServices(ServiceEntity services) {
        this.services = services;
    }
*/
    /*
    @ManyToOne
    @ForeignKey(name = "FK_USER")
    private LoginEntity user;

    @ManyToOne
    @ForeignKey(name = "FK_SERVICE")
    private ServiceEntity service;
*/

}