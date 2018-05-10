package it.iseed.controllers;

import java.math.BigDecimal;
import it.iseed.services.EthereumServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EthereumController{

	BigDecimal wei;
	@Autowired
    private EthereumServiceImpl ethereumService;

	@RequestMapping(value="ethereumController/{u_wallet_address}", method = RequestMethod.POST,headers="Accept=application/json")
    protected BigDecimal checkEthValue(@PathVariable String u_wallet_address) {
		wei = ethereumService.getEthValue(u_wallet_address);
		return wei;
    }
}

