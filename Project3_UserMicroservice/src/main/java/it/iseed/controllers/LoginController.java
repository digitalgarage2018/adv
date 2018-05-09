package it.iseed.controllers;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.io.UnsupportedEncodingException;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import io.jsonwebtoken.ExpiredJwtException;
import it.iseed.account.utils.UserNotLoggedException;
import it.iseed.entities.BaseResponse;
import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.LoginEntity;
import it.iseed.services.LoginService;


@RestController
public class LoginController {

	 private static final String SUCCESS_STATUS = "success";
	 private static final String ERROR_STATUS = "error";
	 private static final int CODE_SUCCESS = 200;
	 private static final int NO_CONNECTION_DB = 400;
	 private static final int DEFAULT_ERROR = 404;
	 private static final int AUTH_FAILURE = 420;
	 private static final int SQL_ERROR = 425;
	
	@Autowired
    private LoginService loginService;

	
	@RequestMapping(value = "/users/{u_username}", method = RequestMethod.GET,headers="Accept=application/json")
	public LoginEntity getUserById(@PathVariable String u_username)
	{
		//System.out.println("user: |"+u_username+"|");
		return loginService.getUser(u_username);
	}
	
	
	@RequestMapping(value="/loginController", method = RequestMethod.POST,headers="Accept=application/json")
	public BaseResponse userCheck(@RequestBody LoginEntity request) {
		
		//System.out.println("user: |"+request.getU_username()+"|");
		//System.out.println("pass: |"+request.getU_pword()+"!");
		
		BaseResponse response = new BaseResponse();
		
		try{
			String result = loginService.authenticateUser(request);
		
			if (result.equals("success")){
				
			   response.setStatus(SUCCESS_STATUS);
			   response.setCode(CODE_SUCCESS);
				
			}else if (result.equals("errorDB")){
	
			   response.setStatus(ERROR_STATUS);
			   response.setCode(NO_CONNECTION_DB);
			}else {
	
			   response.setStatus(ERROR_STATUS);
			   response.setCode(AUTH_FAILURE);
			}
		} catch (UserNotLoggedException e){
			response.setStatus(ERROR_STATUS);
			response.setCode(AUTH_FAILURE);
		}
    	return response;

	}
	
	
	
	@RequestMapping(value = "/loginJSON", method = POST)
    public ResponseEntity<JsonResponseBody> loginUserJson(@RequestBody LoginEntity request){
        //check if user exists in DB -> if exists generate JWT and send back to client
        try {
        	String result = loginService.authenticateUser(request);
            //Optional<LoginEntity> userr = loginService.getUserFromDbAndVerifyPassword(request.getId(), request.getPassword());
            if(result.equals("success")){
        	//if(userr.isPresent()){
            	//LoginEntity user = userr.get();
            	LoginEntity user = loginService.getUser(request.getU_username());
                String jwt = loginService.createJwt(user.getU_username(), user.getU_name(), new Date(), "default_user");
                return ResponseEntity.status(HttpStatus.OK).header("jwt", jwt).body(new JsonResponseBody(HttpStatus.OK.value(), "Success! User logged in!"));
            }
        }catch (UserNotLoggedException e1){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JsonResponseBody(HttpStatus.FORBIDDEN.value(), "Login failed! Wrong credentials" + e1.toString()));
        }catch (UnsupportedEncodingException e2){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JsonResponseBody(HttpStatus.FORBIDDEN.value(), "Token Error" + e2.toString()));
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JsonResponseBody(HttpStatus.FORBIDDEN.value(), "No corrispondence in the database of users"));
    }
	
	
	@RequestMapping("/users/{username}")
    public ResponseEntity<JsonResponseBody> getUserInfo(HttpServletRequest request, @PathVariable(name = "username") String username){
        //request -> fetch JWT -> check validity -> Get operations from the user account
        try {
            loginService.verifyJwtAndGetData(request);
            //user verified
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), loginService.getUser(username)));
        }catch(UnsupportedEncodingException e1){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JsonResponseBody(HttpStatus.FORBIDDEN.value(), "Unsupported Encoding: " + e1.toString()));
        }catch (UserNotLoggedException e2) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JsonResponseBody(HttpStatus.FORBIDDEN.value(), "User not correctly logged: " + e2.toString()));
        }catch(ExpiredJwtException e3){
            return ResponseEntity.status(HttpStatus.GATEWAY_TIMEOUT).body(new JsonResponseBody(HttpStatus.GATEWAY_TIMEOUT.value(), "Session Expired!: " + e3.toString()));
        }
    }
	
	
	
	@RequestMapping("/logout")
    public ResponseEntity<JsonResponseBody> logoutUser(HttpServletRequest request){
        //request -> fetch JWT -> check validity -> Get operations from the user account
        try {
            loginService.logoutJwt(request);
            //user verified
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), "User succesfully logged out"));
        }catch(UnsupportedEncodingException e1){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JsonResponseBody(HttpStatus.FORBIDDEN.value(), "Unsupported Encoding: " + e1.toString()));
        }catch(ExpiredJwtException e3){
            return ResponseEntity.status(HttpStatus.GATEWAY_TIMEOUT).body(new JsonResponseBody(HttpStatus.GATEWAY_TIMEOUT.value(), "Session Expired!: " + e3.toString()));
        }
    }
	
	
	
	
	
	
	
	
	
	
	@RequestMapping(value="/signUpController", method = RequestMethod.POST,headers="Accept=application/json")
	public BaseResponse registerUser(@RequestBody LoginEntity request) {
		
		System.out.println("user: |"+request.getU_username()+"|");
		System.out.println("pass: |"+request.getU_pword()+"!");
		System.out.println(request.getU_email());
		System.out.println(request.getU_name());
		System.out.println(request.getU_surname());
		System.out.println(request.getU_born_date());
		System.out.println(request.getU_born_place());
		String result = loginService.registrationUserService(request);
		
		BaseResponse response = new BaseResponse();
		
		System.out.println("valore ritornato: " +result);
		
		if (result.equals("success")){
			
			   response.setStatus(SUCCESS_STATUS);
			   response.setCode(CODE_SUCCESS);
				
			}else if (result.equals("errorDB")){

			   response.setStatus(ERROR_STATUS);
			   response.setCode(NO_CONNECTION_DB);
			   
			}else if(result.equals("errorSQL")){
				
				response.setStatus(ERROR_STATUS);
				response.setCode(SQL_ERROR);
				
			}else {

			   response.setStatus(ERROR_STATUS);
			   response.setCode(DEFAULT_ERROR);
			}
			
	    	return response;
	}
    ////////////////////////////////////    ////////////////////////////////////	
    //code that hasn't been reworked yet//
	////////////////////////////////////    ////////////////////////////////////
	
		
	@RequestMapping(value="logoutController")
    protected ModelAndView logout(HttpServletRequest request) {  

        HttpSession session=request.getSession();  
        session.invalidate();  
        ModelAndView model = new ModelAndView();
        model.setViewName("redirect:/index.jsp");
        return model;
    }  
	
}
