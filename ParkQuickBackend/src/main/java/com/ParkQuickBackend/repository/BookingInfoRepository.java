package com.ParkQuickBackend.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ParkQuickBackend.entity.BookingInfo;
import com.ParkQuickBackend.entity.ParkingInfo;

@Repository
public interface BookingInfoRepository extends JpaRepository<BookingInfo, Integer>{
	
	@Query(value="select * from bookings b where b.user_id=?1",nativeQuery=true)
	public List<BookingInfo> findByUserId(int id);
	
//	public List<BookingInfo> findByParkingIdIn(List<Integer> list);
	public List<BookingInfo> findByParkingIdIn(List<ParkingInfo> list);
	
	
	@Modifying
	@Transactional
	@Query(value="update bookings b set b.booking_status=?2, b.check_in=?3, b.check_out=?4 where b.booking_id=?1",nativeQuery=true)
	public void modifyBooking(int id, String status, String in, String out);

}
