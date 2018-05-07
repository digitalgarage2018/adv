package it.iseed.daos;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import it.iseed.entities.CountryEntity;

@Repository
@Transactional
public class CountryDaoImpl implements CountryDao {
	
	@PersistenceContext
	public EntityManager entityManager;
	
	public CountryEntity getCountryById(int id){
		return entityManager.find(CountryEntity.class, id);
		
	}

}
