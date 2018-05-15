package it.iseed.daos;

import java.math.BigInteger;
import java.util.concurrent.ExecutionException;
import org.springframework.stereotype.Component;
import org.web3j.exceptions.MessageDecodingException;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.protocol.http.HttpService;

@Component
public class EthereumDaoImpl implements EthereumDao {

	public BigInteger getEth(String walletAddress) throws ExecutionException, InterruptedException,MessageDecodingException {
        Web3j web3 = Web3j.build(new HttpService("https://mainnet.infura.io/7p5VH9KwAQa4dGwllyZ0"));  // defaults to http://localhost:8545/

        // send asynchronous requests to get balance
        EthGetBalance ethGetBalance = web3
                .ethGetBalance(walletAddress, DefaultBlockParameterName.LATEST)
                .sendAsync()
                .get();
        BigInteger wei = ethGetBalance.getBalance();
        return wei;
    }

}
