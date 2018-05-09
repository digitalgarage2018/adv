package it.iseed.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table (name="jwtok")
public class JwtOkEntity {

	@Id
	@NotEmpty @NotBlank @NotNull
    @Column(name="jwt_id", nullable=false, unique=true)
    private String jwt_id;

	public String getJwt_id() {
		return jwt_id;
	}

	public void setJwt_id(String jwt_id) {
		this.jwt_id = jwt_id;
	}
	
}

