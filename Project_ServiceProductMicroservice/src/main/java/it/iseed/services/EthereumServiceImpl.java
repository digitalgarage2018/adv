package it.iseed.services;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.concurrent.ExecutionException;
import it.iseed.daos.EthereumDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.exceptions.MessageDecodingException;
import org.web3j.utils.Convert;

@Service
public class EthereumServiceImpl implements EthereumService {
	@Autowired
    private EthereumDao/*Impl*/ ethereumDao;
	
		public BigDecimal getEthValue(String walletAddress) {
			 BigInteger wei = null;
			 BigDecimal wei2= null;
			 try{
				 wei = ethereumDao.getEth(walletAddress);
				 wei2= Convert.fromWei(wei.toString(), Convert.Unit.ETHER);
			 }
			 catch (InterruptedException e){
				 System.out.println("errore interr: "+e);
			 } catch (ExecutionException e){
				 System.out.println("errore exec : "+e);
			 } catch (MessageDecodingException e){
				 System.out.println("errore exec: "+e);
			 }
			return wei2;		 
		 }
		 /* To delete, we needn't it anymore*/
		/*
	public String getWalletAddress(String userId){
		
		LoginEntity user = null;
		String walletAddress = null;
		try {
			user = ethereumDao.getLoginById(userId);
			walletAddress = user.getWalletAddress();
		} catch(Exception e){
			 System.out.println("errore exec: "+e);			
		}
		return walletAddress;
		
	}*/
}
