package it.iseed.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.iseed.daos.CountryDao;
import it.iseed.entities.CountryEntity;


@Service
public class CountryServiceImpl implements CountryService{
	
	@Autowired
	CountryDao countryDao;
	
	public List<CountryEntity> getListOfCountries(){
		return null;
		//return this.countryDao.getListOfCountries();
	}
	
	public CountryEntity getCountryById(int id){
		return this.countryDao.getCountryById(id);
	}

}
