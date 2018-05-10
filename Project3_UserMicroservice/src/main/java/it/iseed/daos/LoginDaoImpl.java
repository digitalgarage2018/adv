package it.iseed.daos;


import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.CannotCreateTransactionException;
import org.springframework.transaction.annotation.Transactional;

import it.iseed.entities.JwtOkEntity;
import it.iseed.entities.LoginEntity;

@Repository
@Transactional
public class LoginDaoImpl implements LoginDao {

	@PersistenceContext
	 public EntityManager entityManager;
	
	 public LoginEntity getLoginById(String u_username) {
		return entityManager.find(LoginEntity.class, u_username);
	 }

	 public String registerUser(LoginEntity signUpBean) throws PersistenceException,CannotCreateTransactionException{
		 String query = "insert into users (u_username,u_pword,u_email,u_name,u_surname,u_born_date,u_born_place) values (?,?,?,?,?,?,?);";
		 /*System.out.println(signUpBean.getU_username());
		 System.out.println(signUpBean.getU_pword());
		 System.out.println(signUpBean.getU_email());
		 System.out.println(signUpBean.getU_name());
		 System.out.println(signUpBean.getU_surname());
		 System.out.println(signUpBean.getU_born_date());
		 System.out.println(signUpBean.getU_born_place());*/
		 entityManager.createNativeQuery(query).setParameter(1, signUpBean.getU_username())
		 		.setParameter(2, signUpBean.getU_pword())
		 		.setParameter(3, signUpBean.getU_email())
		 		.setParameter(4, signUpBean.getU_name())
		 		.setParameter(5, signUpBean.getU_surname())
		 		.setParameter(6, signUpBean.getU_born_date())
		 		.setParameter(7, signUpBean.getU_born_place())
		 		.executeUpdate();		 
		 
		 return "success";
	 }
	 
	 public JwtOkEntity checkJwt(String jwt_id){
		 return entityManager.find(JwtOkEntity.class, jwt_id);
	 }
	 
	 public void insertJwt(String token, long expDate){
		 cleanDB();
		 String query = "insert into jwtok values(?,?)";
		 entityManager.createNativeQuery(query)
		    .setParameter(1, token)
		    .setParameter(2, expDate)
		    .executeUpdate();
	 }
	 
	 public void removeJwt(String token){
		 String query = "delete from jwtok where jwt_id = ?";
		 entityManager.createNativeQuery(query)
		    .setParameter(1, token)
		    .executeUpdate();
		 System.out.println("Eliminato: "+token);
	 }
	 
	 public void cleanDB(){
		 String query = "delete from jwtok where jwt_exp_date < DATEDIFF(NOW(),'1970-01-02') * 86400 *1000"; //elimina i cookies da db più vecchi di 2 giorni
		 entityManager.createNativeQuery(query)
		    .executeUpdate();
		 System.out.println("Pulito DB");
	 }
	 
}
