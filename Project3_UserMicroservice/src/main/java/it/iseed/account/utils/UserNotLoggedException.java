package it.iseed.account.utils;

public class UserNotLoggedException extends Exception {

    public UserNotLoggedException(String errorMessage){
        super(errorMessage);
    }
}
