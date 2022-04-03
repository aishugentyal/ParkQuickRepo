package com.ParkQuickBackend.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ParkQuickBackend.entity.ParkingInfo;

@Repository
public interface ParkingInfoRepository extends JpaRepository<ParkingInfo, Integer>{
	
	ParkingInfo findByParkingId(int parkingId);
	
	@Query(value="select * from parking_space p where p.user_id=?1",nativeQuery=true)
	public List<ParkingInfo> getParkingsByUser(int userId);
	
	@Query(value="select parking_id from parking_space p where p.user_id=?1",nativeQuery=true)
	public List<Integer> findParkingIdByUserId(int id);
	
	
	@Modifying
	@Transactional
	@Query(value="update parking_space p set p.slot_available_two_wheeler=?2, p.slot_available_four_wheeler=?3 where p.parking_id=?1",nativeQuery=true)
	public void modifyCount(int id, int count2Wheeler, int count4Wheeler);
}
