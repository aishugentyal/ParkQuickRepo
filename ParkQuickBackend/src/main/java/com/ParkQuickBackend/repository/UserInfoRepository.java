package com.ParkQuickBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ParkQuickBackend.entity.UserInfo;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
	
	@Query(value="select email_id from user u where u.email_id=?1",nativeQuery=true)
	public String checkEmail(String email);
	
	@Query(value="select * from user u where u.email_id=?1 and u.password=?2",nativeQuery=true)
	public UserInfo checkUser(String email, String password);

}
