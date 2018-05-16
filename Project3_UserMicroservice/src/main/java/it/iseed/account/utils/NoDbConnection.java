package it.iseed.account.utils;

public class NoDbConnection extends Exception {

	public NoDbConnection(String errorMessage){
        super(errorMessage);
    }
}
