package it.iseed.entities;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "centers")
public class WellnessCenterEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long w_centerID;

    @NotEmpty
    @Column(name="w_username", nullable=false)
    private String w_username;

    @NotEmpty
    @Column(name="w_password", nullable=false)
    private String w_password;

    @NotEmpty
    @Column(name="w_name", nullable=false)
    private String w_name;

    @NotEmpty
    @Column(name="w_address", nullable=false)
    private String w_address;

    @NotEmpty
    @Column(name="w_phone", nullable=false)
    private int w_phone;

    @NotEmpty
    @Column(name="w_mail", nullable=false)
    private String w_mail;

    public long getW_centerID() {
        return w_centerID;
    }

    public void setW_centerID(long w_centerID) {
        this.w_centerID = w_centerID;
    }

    public String getW_username() {
        return w_username;
    }

    public void setW_username(String w_username) {
        this.w_username = w_username;
    }

    public String getW_password() {
        return w_password;
    }

    public void setW_password(String w_password) {
        this.w_password = w_password;
    }

    public String getW_name() {
        return w_name;
    }

    public void setW_name(String w_name) {
        this.w_name = w_name;
    }

    public String getW_address() {
        return w_address;
    }

    public void setW_address(String w_address) {
        this.w_address = w_address;
    }

    public int getW_phone() {
        return w_phone;
    }

    public void setW_phone(int w_phone) {
        this.w_phone = w_phone;
    }

    public String getW_mail() {
        return w_mail;
    }

    public void setW_mail(String w_mail) {
        this.w_mail = w_mail;
    }
}
