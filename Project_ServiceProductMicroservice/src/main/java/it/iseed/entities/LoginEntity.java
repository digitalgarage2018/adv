package it.iseed.entities;


import java.io.Serializable;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table (name="users")
public class LoginEntity implements Serializable{
/*
    @JoinTable
    @ManyToMany(mappedBy = "users")
    private List<ServiceEntity> listService;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "USER_SERVICE",
            joinColumns = {@JoinColumn(name = "UID", referencedColumnName = "u_username")}
            inverseJoinColumns={@JoinColumn(name="SID", referencedColumnName="sr_serviceID)})
            private LoginEntity ser;
*/

	@Id
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

/*
    @Id
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="u_username")
	private Set<PurchaseServEntity> purchServ;
    */

	//creation of the join table, the foreign keys are implicit in the column
	/*@ManyToMany//(targetEntity = ServiceEntity.class, mappedBy = "LoginEntity")
	@JoinTable(name="USERS_SERVICES",
			joinColumns = {@JoinColumn(name = "u_usernameQ",referencedColumnName = "u_username")},
			inverseJoinColumns = {@JoinColumn(name = "sr_serviceIDQ", referencedColumnName = "sr_serviceID")})
	public List<ServiceEntity> getListServices() {
		return listServices;
	}*/


 
	public String getUsername() {
		return u_username;
	}
 
	public void setUsername(String username) {
		this.u_username = username;
	}
 
	public String getPassword() {
		return u_pword;
	}
 
	public void setPassword(String password) {
		this.u_pword = password;
	}

	public String getEmail() {
		return u_email;
	}

	public void setEmail(String u_email) {
		this.u_email = u_email;
	}

	public String getName() {
		return u_name;
	}

	public void setName(String u_name) {
		this.u_name = u_name;
	}

	public String getSurname() {
		return u_surname;
	}

	public void setSurname(String u_surname) {
		this.u_surname = u_surname;
	}

	public String getBorn_date() {
		return u_born_date;
	}

	public void setBorn_date(String u_born_date) {
		this.u_born_date = u_born_date;
	}

	public String getBorn_place() {
		return u_born_place;
	}

	public void setBorn_place(String u_born_place) {
		this.u_born_place = u_born_place;
	}

	public String getWalletAddress() {
		return u_wallet_address;
	}

	public void setWalletAddress(String u_wallet_address) {
		this.u_wallet_address = u_wallet_address;
	}


}
