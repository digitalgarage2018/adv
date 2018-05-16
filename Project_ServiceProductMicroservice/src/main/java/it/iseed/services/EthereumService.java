package it.iseed.services;

import java.math.BigDecimal;

public interface EthereumService {
	public BigDecimal getEthValue(String walletAddress);
//public String getWalletAddress(String userId);
}
