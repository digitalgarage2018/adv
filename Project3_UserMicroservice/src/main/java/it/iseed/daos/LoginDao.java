package it.iseed.daos;

import javax.persistence.PersistenceException;

import org.springframework.transaction.CannotCreateTransactionException;

import it.iseed.entities.JwtOkEntity;
import it.iseed.entities.LoginEntity;
import it.iseed.entities.WellnessCenterEntity;

public interface LoginDao {
	public LoginEntity getLoginById(String u_username);
	public WellnessCenterEntity getCenterById(String w_username);
	public String registerUser(LoginEntity signUpBean)throws PersistenceException,CannotCreateTransactionException;
	public JwtOkEntity checkJwt(String jwt);
	public void insertJwt(String token, long expDate);
	public void removeJwt(String token);
}
