package it.iseed.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PageController {
	
	@RequestMapping(value="loginPage")
	public ModelAndView loginPage() {
		
		ModelAndView model = new ModelAndView();
		model.setViewName("login");
		
    	return model;
	}
	
	@RequestMapping(value="signUpPage")
	public ModelAndView signUpPage() {
		
		ModelAndView model = new ModelAndView();
		model.setViewName("sign_up");
		
    	return model;
	}

	@RequestMapping(value="indexPage")
	public ModelAndView indexPage() {
		
		ModelAndView model = new ModelAndView();
		model.setViewName("redirect:/index.jsp");
		
    	return model;
	}
}
