package it.iseed.services;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Map;

import javax.persistence.PersistenceException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.CannotCreateTransactionException;


import it.iseed.account.utils.JwtUtils;
import it.iseed.account.utils.UserNotLoggedException;
import it.iseed.daos.LoginDao;
import it.iseed.entities.LoginEntity;
import it.iseed.entities.WellnessCenterEntity;



@Service
public class LoginServiceImpl implements LoginService {
	
	@Autowired
	LoginDao loginDao;
	
	private static final Logger log = LoggerFactory.getLogger(LoginServiceImpl.class);

	 //autenticazione User
	 public String authenticateUser(LoginEntity loginEntity) throws UserNotLoggedException{
		 try{
			 LoginEntity login = loginDao.getLoginById(loginEntity.getU_username());
		 
		 if(login!=null){
			 if(login.getU_pword().equals(loginEntity.getU_pword()) && login.getU_username().equals(loginEntity.getU_username())){
				 return "success";
			 }
		 }
		 }catch (Exception e){
			 System.out.println("Connection failed!!\n" + e);
			 return "errorDB";
		 }
		 finally{
			 
		 }
		 return "failure";
	 }
	 
	 //autenticazione Center
	 public String authenticateCenter(WellnessCenterEntity centerEntity) throws UserNotLoggedException{
		 try{
			 WellnessCenterEntity login = loginDao.getCenterById(centerEntity.getW_username());
		 
		 if(login!=null){
			 if(login.getW_password().equals(centerEntity.getW_password()) && login.getW_username().equals(centerEntity.getW_username())){
				 return "success";
			 }
		 }
		 }catch (Exception e){
			 System.out.println("Connection failed!!\n" + e);
			 return "errorDB";
		 }
		 finally{
			 
		 }
		 return "failure";
	 }

	 //Registrazione utente
	 public String registrationUserService(LoginEntity signUpBean) {
		 
		 try{
			String result = loginDao.registerUser(signUpBean);
			if (result.equals("success")){
				return "success";
			}
		 }catch (PersistenceException e){
			 System.out.println("Connection failed!!\n" + e);
			 return "errorSQL";
		 }catch (CannotCreateTransactionException e){
			 System.out.println("Connection failed!!\n" + e);
			 return "errorDB";
		 }finally{
			 
		 }
		return "failure";			
		}
	 
	 //get informazioni utente
	 public LoginEntity getUser(String u_username){
		 return loginDao.getLoginById(u_username);
	 }
	 
	//get informazioni centro
		 public WellnessCenterEntity getCenter(String w_username){
			 return loginDao.getCenterById(w_username);
		 }
	 
	 //creazione JWT
	 @Override
	    public String createJwt(String subject, String name, Date datenow,String permission) throws UnsupportedEncodingException{
	        Date expDate = datenow;
	        expDate.setTime(datenow.getTime() + (600*1000)); //jwt valido per 10 minuti
	        log.info("JWT Creation. Expiration time: " + expDate.getTime());
	        String token = JwtUtils.generateJwt(subject, expDate, name, permission);
	        
	        try{
	        	loginDao.insertJwt(token,expDate.getTime());
	        }catch (Exception e){
	        	throw new UnsupportedEncodingException("No db connection, couldn't create jwt correctly");
	        }

	        
	        return token;
	    }
	 
	 //verifica validità JWT
	 @Override
	    public Map<String, Object> verifyJwtAndGetData(HttpServletRequest request) throws UserNotLoggedException, UnsupportedEncodingException{
	        String jwt = JwtUtils.getJwtFromHttpRequest(request);
	        //System.out.println("Controllo scadenza jwt 2: ");
	        if(jwt == null){
	            throw new UserNotLoggedException("Authentication token not found in the request");
	        }
	        
		    if (loginDao.checkJwt(jwt)==null){
		        throw new UserNotLoggedException("Authentication token not valid");
		    }
		    
		    else{
		    	//System.out.println("Controllo scadenza jwt 3: ");
		        Map<String, Object> userData = JwtUtils.jwt2Map(jwt);
		        return userData;
		    }
	    }
	 
	 //logout
	 public void logoutJwt(HttpServletRequest request) throws UnsupportedEncodingException{
		 String jwt = JwtUtils.getJwtFromHttpRequest(request);
		 try{
			 loginDao.removeJwt(jwt);
		 }catch (Exception e){
			 throw new UnsupportedEncodingException("No db connection, couldn't delete jwt correctly");
		 }
	 }
}
