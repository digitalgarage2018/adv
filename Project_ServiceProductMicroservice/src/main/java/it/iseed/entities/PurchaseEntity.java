
package it.iseed.entities;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.io.Serializable;
import java.sql.Date;
import java.util.Set;

@Entity
@Table(name = "purchase")
public class PurchaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long pur_purchaseID;

    @NotEmpty
    @Column(name="pur_username", nullable=false)
    private String pur_username;

    @NotNull
    @Column(name="pur_serviceID", nullable=false)
    private long pur_serviceID;

    @NotNull
    @Column(name="pur_date", nullable=false)
    private Date pur_date;

    public long getPur_purchaseID() {
        return pur_purchaseID;
    }

    public void setPur_purchaseID(long pur_purchaseID) {
        this.pur_purchaseID = pur_purchaseID;
    }

    public String getPur_username() {
        return pur_username;
    }

    public void setPur_username(String pur_username) {
        this.pur_username = pur_username;
    }

    public Date getPur_date() {
        return pur_date;
    }

    public void setPur_date(Date pur_date) {
        this.pur_date = pur_date;
    }

    public long getPur_serviceID() {
        return pur_serviceID;
    }

    public void setPur_serviceID(long pur_serviceID) {
        this.pur_serviceID = pur_serviceID;
    }


}