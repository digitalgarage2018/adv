package it.iseed.controllers;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.ExpiredJwtException;
import it.iseed.account.utils.JwtUtils;
import it.iseed.account.utils.NoDbConnection;
import it.iseed.account.utils.UserNotLoggedException;
import it.iseed.entities.JsonResponseBody;
import it.iseed.entities.JwtOkEntity;
import it.iseed.entities.LoginEntity;
import it.iseed.entities.WellnessCenterEntity;
import it.iseed.services.LoginService;

@CrossOrigin("*")

@RestController
public class LoginController {

//******LEGENDA STATUS COMUNICATI AL CLIENT
////////
////////OK->200->success
////////FORBIDDEN->403->errore di login e/o jwt errata
////////PRECONDITION_FAILED->412->token con formato errato
////////SERVICE_UNAVAILABLE->503->no db connection
////////NOT_IMPLEMENTED->501->errore generico
////////GATEWAY_TIMEOUT->504->session expired
////////
//******FINE LEGENDA

	@Autowired
    private LoginService loginService;

	
	@RequestMapping(value = "/login", method = POST)
    public ResponseEntity<JsonResponseBody> loginUserJson(@RequestBody LoginEntity request){
        //check if user exists in DB -> if exists generate JWT and send back to client
        try {
        	String result = loginService.authenticateUser(request);
            //Optional<LoginEntity> userr = loginService.getUserFromDbAndVerifyPassword(request.getId(), request.getPassword());
            if(result.equals("success")){
            	LoginEntity user = loginService.getUser(request.getU_username());
                String jwt = loginService.createJwt(user.getU_username(), user.getU_name(), new Date(), "default_user");
                return ResponseEntity.status(HttpStatus.OK)
                		.header("Access-Control-Allow-Origin", "*")
                		.header("Access-Control-Allow-Credentials", "true")
                		.header("Access-Control-Allow-Headers", "jwt")
                		.header("Access-Control-Expose-Headers", "jwt")
                		.header("jwt",jwt)
                		.body(new JsonResponseBody(HttpStatus.OK.value(), "Success! User logged in!"));
            }
        }catch (UserNotLoggedException e1){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JsonResponseBody(HttpStatus.FORBIDDEN.value(), "Login failed! Wrong credentials"));
        }catch (UnsupportedEncodingException e2){
            return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body(new JsonResponseBody(HttpStatus.PRECONDITION_FAILED.value(), "Token Error" + e2.toString()));
        }catch (NoDbConnection e3){
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "No DB connection"));
        }
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new JsonResponseBody(HttpStatus.NOT_IMPLEMENTED.value(), "Generic Error"));
    }
	
	
	@RequestMapping(value = "/loginCenter", method = POST)
    public ResponseEntity<JsonResponseBody> loginCenterJson(@RequestBody WellnessCenterEntity request){
        //check if center exists in DB -> if exists generate JWT and send back to client
        try {
        	String result = loginService.authenticateCenter(request);

            if(result.equals("success")){

            	WellnessCenterEntity user = loginService.getCenter(request.getW_username());
                String jwt = loginService.createJwt(user.getW_username(), user.getW_name(), new Date(), "default_center");

                return ResponseEntity.status(HttpStatus.OK)
                		.header("Access-Control-Allow-Origin", "*")
                		.header("Access-Control-Allow-Credentials", "true")
                		.header("Access-Control-Allow-Headers", "jwt")	//allow the client to see header "jwt"
                		.header("Access-Control-Expose-Headers", "jwt")	//expose to the client the header "jwt"
                		.header("jwt",jwt)
                		.body(new JsonResponseBody(HttpStatus.OK.value(), "Success! Center logged in!"));
            }
        }catch (UserNotLoggedException e1){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JsonResponseBody(HttpStatus.FORBIDDEN.value(), "Login failed! Wrong credentials" ));
        }catch (UnsupportedEncodingException e2){
            return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body(new JsonResponseBody(HttpStatus.PRECONDITION_FAILED.value(), "Token Error" + e2.toString()));
        }catch (NoDbConnection e3){
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "No DB connection"));
        }
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new JsonResponseBody(HttpStatus.NOT_IMPLEMENTED.value(), "No corrispondence in the database of centers"));
    }
	
	
	
    //public ResponseEntity<JsonResponseBody> logoutUser(@RequestHeader(value="jwt") String jwt,HttpServletRequest request){
	@RequestMapping("/logout")
	public ResponseEntity<JsonResponseBody> logoutUser(HttpServletRequest request){
        //request -> fetch JWT -> check validity -> Get operations from the user account
		
		String jwt = JwtUtils.getJwtFromHttpRequest(request);
		System.out.println("jwt: "+jwt);
		
        if(jwt == null){
        	return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.FORBIDDEN.value(), "Missing jwt"));
        }	
        JwtOkEntity tmp = null;
        
        try {
        	tmp = loginService.checkSerJwt(jwt);
        	if (tmp == null){
        		return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.FORBIDDEN.value(), "User already logged out"));
        	}
        }catch (Exception e){
        	System.out.println("errore: " + e);
        	return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "No DB connection"));
        }
        
		try {
            loginService.logoutJwt(request);
            //user verified
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), "User succesfully logged out"));
        }catch(UnsupportedEncodingException e1){
            return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body(new JsonResponseBody(HttpStatus.PRECONDITION_FAILED.value(), "Unsupported Encoding: " + e1.toString()));
        }catch(ExpiredJwtException e3){
            return ResponseEntity.status(HttpStatus.GATEWAY_TIMEOUT).body(new JsonResponseBody(HttpStatus.GATEWAY_TIMEOUT.value(), "Session Expired!: " + e3.toString()));
        }catch (NoDbConnection e4){
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "No DB connection"));
        }
    }
	
	
	
	
	@RequestMapping(value="/signUpController", method = RequestMethod.POST,headers="Accept=application/json")
	public ResponseEntity<JsonResponseBody> registerUser(@RequestBody LoginEntity request) {
		
		System.out.println("user: |"+request.getU_username()+"|");
		System.out.println("pass: |"+request.getU_pword()+"!");
		System.out.println(request.getU_email());
		System.out.println(request.getU_name());
		System.out.println(request.getU_surname());
		System.out.println(request.getU_born_date());
		System.out.println(request.getU_born_place());
		
		if (request.getU_username()!= "" &&
			request.getU_pword()!= "" &&	
			request.getU_email()!= "" &&
			request.getU_name()!= "" &&	
			request.getU_surname()!= "" &&
			request.getU_born_date()!= "" &&
			request.getU_born_place()!= ""
			){

				try{
					String result = loginService.registrationUserService(request);
					
					//BaseResponse response = new BaseResponse();
					
					System.out.println("valore ritornato: " +result);
					
					if (result.equals("success")){
						LoginEntity user = loginService.getUser(request.getU_username());
			            String jwt = loginService.createJwt(user.getU_username(), user.getU_name(), new Date(), "default_user");
			            return ResponseEntity.status(HttpStatus.OK)
			            		.header("Access-Control-Allow-Origin", "*")
			            		.header("Access-Control-Allow-Credentials", "true")
			            		.header("Access-Control-Allow-Headers", "jwt")
			            		.header("Access-Control-Expose-Headers", "jwt")
			            		.header("jwt",jwt)
			            		.body(new JsonResponseBody(HttpStatus.OK.value(), "Success! User signed up and logged in!"));
			        }
				}catch(NoDbConnection e1){
					return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "No DB connection"));
		        }catch (UserNotLoggedException e2) {
		            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JsonResponseBody(HttpStatus.FORBIDDEN.value(), "User not correctly logged: " + e2.toString()));
		        } catch (UnsupportedEncodingException e3) {
		        	 return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body(new JsonResponseBody(HttpStatus.PRECONDITION_FAILED.value(), "Unsupported Encoding: " + e3.toString()));
				}
				return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new JsonResponseBody(HttpStatus.NOT_IMPLEMENTED.value(), "Generic Error"));
		}else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JsonResponseBody(HttpStatus.FORBIDDEN.value(), "I campi devono tutti essere valorizzati: "));
		}
	}
	
	
	
	
	//////////////////prova di chiamata al controllo JWT per user
	@RequestMapping("/checkjwtuser")
    public ResponseEntity<JsonResponseBody> checkJwtforUser(HttpServletRequest request){
        //request -> fetch JWT -> check validity -> Get operations from the user account
        try {
        	Map<String, Object> userData = loginService.verifyJwtAndGetData(request);
        	        	
        	String jwt_name=(String) userData.get("name");
        	String jwt_scope=(String) userData.get("scope");
        	Date jwt_exp_date=(Date) userData.get("exp_date");
        	String jwt_subject=(String) userData.get("subject");
        	System.out.println("name: "+jwt_name);
        	System.out.println("scope: "+jwt_scope);
        	System.out.println("expDate: "+jwt_exp_date);
        	System.out.println("subject: "+jwt_subject);
        	
        	if (jwt_scope.equals("default_user")){
            //user verified
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(),  loginService.getUser(jwt_subject)));
        	}
        	else {
        		return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.NOT_ACCEPTABLE.value(), "You have no permissions to do this: " ));
        	}
        }catch(UnsupportedEncodingException e1){
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.PRECONDITION_FAILED.value(), "Unsupported Encoding: " + e1.toString()));
        }catch (UserNotLoggedException e2) {
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.FORBIDDEN.value(), "User not correctly logged: " + e2.toString()));
        }catch(ExpiredJwtException e3){
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.GATEWAY_TIMEOUT.value(), "Session Expired!: " + e3.toString()));
        }catch (NoDbConnection e4){
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "No connection DB"));
        }
    }
	
	//////////////////prova di chiamata al controllo JWT per center
	@RequestMapping("/checkjwtcenter")
    public ResponseEntity<JsonResponseBody> checkJwtforCenter(HttpServletRequest request){
        //request -> fetch JWT -> check validity -> Get operations from the center
        try {
        	Map<String, Object> userData = loginService.verifyJwtAndGetData(request);
        	        	
        	String jwt_name=(String) userData.get("name");
        	String jwt_scope=(String) userData.get("scope");
        	Date jwt_exp_date=(Date) userData.get("exp_date");
        	String jwt_subject=(String) userData.get("subject");
        	System.out.println("name: "+jwt_name);
        	System.out.println("scope: "+jwt_scope);
        	System.out.println("expDate: "+jwt_exp_date);
        	System.out.println("subject: "+jwt_subject);
        	
        	if (jwt_scope.equals("default_center")){
            //user verified
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), loginService.getCenter(jwt_subject)));
        	}
        	else {
        		return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.NOT_ACCEPTABLE.value(), "You have no permissions to do this: " ));
        	}
        }catch(UnsupportedEncodingException e1){
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.PRECONDITION_FAILED.value(), "Unsupported Encoding: " + e1.toString()));
        }catch (UserNotLoggedException e2) {
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.FORBIDDEN.value(), "User not correctly logged: " + e2.toString()));
        }catch(ExpiredJwtException e3){
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.GATEWAY_TIMEOUT.value(), "Session Expired!: " + e3.toString()));
        }catch (NoDbConnection e4){
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "No connection DB"));
        }
    }

	/*
	@RequestMapping("/users/{username}")
    public ResponseEntity<JsonResponseBody> getUserInfo(HttpServletRequest request, @PathVariable(name = "username") String username){
        //request -> fetch JWT -> check validity -> Get operations from the user account
        try {
        	Map<String, Object> userData = loginService.verifyJwtAndGetData(request);

        	String jwt_name=(String) userData.get("name");
        	String jwt_scope=(String) userData.get("scope");
        	Date jwt_exp_date=(Date) userData.get("exp_date");
        	String jwt_subject=(String) userData.get("subject");
        	System.out.println("name: "+jwt_name);
        	System.out.println("scope: "+jwt_scope);
        	System.out.println("expDate: "+jwt_exp_date);
        	System.out.println("subject: "+jwt_subject);	
        	
        	if (jwt_scope.equals("default_user")){
            //user verified
            return ResponseEntity.status(HttpStatus.OK).body(new JsonResponseBody(HttpStatus.OK.value(), loginService.getUser(username)));
        	}
        	else {
        		return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(new JsonResponseBody(HttpStatus.NOT_ACCEPTABLE.value(), "You have no permissions to do this: " ));
        	}
        	
        		
        }catch(UnsupportedEncodingException e1){
            return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body(new JsonResponseBody(HttpStatus.PRECONDITION_FAILED.value(), "Unsupported Encoding: " + e1.toString()));
        }catch (UserNotLoggedException e2) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JsonResponseBody(HttpStatus.FORBIDDEN.value(), "User not correctly logged: " + e2.toString()));
        }catch(ExpiredJwtException e3){
            return ResponseEntity.status(HttpStatus.GATEWAY_TIMEOUT).body(new JsonResponseBody(HttpStatus.GATEWAY_TIMEOUT.value(), "Session Expired!: " + e3.toString()));
        }catch (NoDbConnection e4){
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new JsonResponseBody(HttpStatus.SERVICE_UNAVAILABLE.value(), "No DB connection"));
        }
    }*/
	
	
}
