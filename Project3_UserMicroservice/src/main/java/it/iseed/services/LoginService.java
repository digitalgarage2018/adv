package it.iseed.services;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import it.iseed.account.utils.NoDbConnection;
import it.iseed.account.utils.UserNotLoggedException;
import it.iseed.entities.JwtOkEntity;
import it.iseed.entities.LoginEntity;
import it.iseed.entities.WellnessCenterEntity;

public interface LoginService {
	
	public String authenticateUser(LoginEntity loginBean) throws UserNotLoggedException, NoDbConnection;
	public String authenticateCenter(WellnessCenterEntity centerEntity) throws UserNotLoggedException, NoDbConnection;
	public String registrationUserService(LoginEntity signUpBean) throws NoDbConnection, UserNotLoggedException;
	public LoginEntity getUser(String u_username);
	public WellnessCenterEntity getCenter(String w_username);
	public String createJwt(String subject, String name, Date datenow, String permission) throws UnsupportedEncodingException, NoDbConnection;
	public Map<String, Object> verifyJwtAndGetData(HttpServletRequest request)
			throws UserNotLoggedException, UnsupportedEncodingException, NoDbConnection;
	public void logoutJwt(HttpServletRequest request) throws UnsupportedEncodingException, NoDbConnection;
	public JwtOkEntity checkSerJwt(String jwt);

}
