package it.iseed.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table (name="users")
public class LoginEntity implements Serializable{

	/*
	@NotEmpty @NotBlank @NotNull
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long u_id;*/
	
	@Id
	@NotEmpty @NotBlank @NotNull
    @Column(name="u_username", nullable=false, unique=true)
    private String u_username;	
	
	@NotEmpty
    @Column(name="u_pword", nullable=false)
    private String u_pword;
    
    @NotEmpty
    @Column(name="u_email", nullable=false)
    private String u_email;

    @NotEmpty
    @Column(name="u_name", nullable=false)
    private String u_name;

    @NotEmpty
    @Column(name="u_surname", nullable=false)
    private String u_surname;

    @NotEmpty
    @Column(name="u_born_date", nullable=false)
    private String u_born_date;

    @NotEmpty
    @Column(name="u_born_place", nullable=false)
    private String u_born_place;

    @ManyToMany
	private List<ServiceEntity> serviceList;

	@Column(name="u_wallet_address")
	private String u_wallet_address;

	public String getU_username() {
		return u_username;
	}

	public void setU_username(String u_username) {
		this.u_username = u_username;
	}

	public String getU_pword() {
		return u_pword;
	}

	public void setU_pword(String u_pword) {
		this.u_pword = u_pword;
	}

	public String getU_email() {
		return u_email;
	}

	public void setU_email(String u_email) {
		this.u_email = u_email;
	}

	public String getU_name() {
		return u_name;
	}

	public void setU_name(String u_name) {
		this.u_name = u_name;
	}

	public String getU_surname() {
		return u_surname;
	}

	public void setU_surname(String u_surname) {
		this.u_surname = u_surname;
	}

	public String getU_born_date() {
		return u_born_date;
	}

	public void setU_born_date(String u_born_date) {
		this.u_born_date = u_born_date;
	}

	public String getU_born_place() {
		return u_born_place;
	}

	public void setU_born_place(String u_born_place) {
		this.u_born_place = u_born_place;
	}

	public List<ServiceEntity> getServiceList() {
		return serviceList;
	}

	public void setServiceList(List<ServiceEntity> serviceList) {
		this.serviceList = serviceList;
	}

	public String getU_wallet_address() {
		return u_wallet_address;
	}

	public void setU_wallet_address(String u_wallet_address) {
		this.u_wallet_address = u_wallet_address;
	}

}
