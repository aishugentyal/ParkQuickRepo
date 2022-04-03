package com.ParkQuickBackend.controller;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ParkQuickBackend.entity.BookingInfo;
import com.ParkQuickBackend.entity.ParkingInfo;
import com.ParkQuickBackend.repository.BookingInfoRepository;
import com.ParkQuickBackend.repository.ParkingInfoRepository;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/booking/v3")
public class BookingInfoController {
	
	@Autowired 
	private BookingInfoRepository bookingInfoRepository;
	
	@Autowired
	private ParkingInfoRepository parkingRepository;
	
	@PostMapping("/bookParking")
	public BookingInfo bookParking(@RequestBody BookingInfo bookingInfo){
		bookingInfo.setBookingStatus("Booked");
		ParkingInfo parkingInfo = bookingInfo.getParkingId();
		if(bookingInfo.getVehicleType().equals("2 Wheeler")) {
			parkingInfo.setSlotAvailableTwoWheeler((parkingInfo.getSlotAvailableTwoWheeler() - 1));
		} else if (bookingInfo.getVehicleType().equals("4 Wheeler")) {
			parkingInfo.setSlotAvailableFourWheeler((parkingInfo.getSlotAvailableFourWheeler() - 1));
		}
		parkingRepository.modifyCount(parkingInfo.getParkingId(), parkingInfo.getSlotAvailableTwoWheeler(), parkingInfo.getSlotAvailableFourWheeler());
		return bookingInfoRepository.save(bookingInfo);
	}
	
	@GetMapping("/getOwnerBookings/{id}")
	public List<BookingInfo> getOwnerBookings(@PathVariable int id) {
//		List<Integer> parkingIdList = parkingRepository.findParkingIdByUserId(id);
		List<ParkingInfo> parkingIdList = parkingRepository.getParkingsByUser(id);
		return bookingInfoRepository.findByParkingIdIn(parkingIdList);
	}
	
	@GetMapping("/getCustomerBookings/{id}")
	public List<BookingInfo> getCustomerBookings(@PathVariable int id) {
		return bookingInfoRepository.findByUserId(id);
	}
	
	@GetMapping("/getbookingById/{id}")
	public BookingInfo getbookingById(@PathVariable int id) {
		return bookingInfoRepository.findById(id).get();
	}
	
	@GetMapping("/deletebookingById/{id}")
	public void deletebookingById(@PathVariable int id) {
		bookingInfoRepository.deleteById(id);
		System.out.println("delete successful");
	}
	
	@PostMapping("/modifyBooking")
	public void modifyBooking(@RequestBody BookingInfo bookingInfo){
		String bookingStatus = bookingInfo.getBookingStatus();
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		if(bookingStatus.equalsIgnoreCase("Parked")) {
			bookingInfo.setCheckIn(timestamp.toString());
			bookingInfo.setCheckOut("");
		} else if(bookingStatus.equalsIgnoreCase("Checked Out")) {
			bookingInfo.setCheckOut(timestamp.toString());
			String vehicletype = bookingInfo.getVehicleType();
			ParkingInfo parkingInfo = bookingInfo.getParkingId();
			if(vehicletype.equalsIgnoreCase("2 Wheeler")) {
				parkingRepository.modifyCount(parkingInfo.getParkingId(), parkingInfo.getSlotAvailableTwoWheeler() + 1, parkingInfo.getSlotAvailableFourWheeler());
			} else if (vehicletype.equalsIgnoreCase("4 Wheeler")) {
				parkingRepository.modifyCount(parkingInfo.getParkingId(), parkingInfo.getSlotAvailableTwoWheeler(), parkingInfo.getSlotAvailableFourWheeler() + 1);				
			}
		}
		bookingInfoRepository.modifyBooking(bookingInfo.getBookingId(), bookingInfo.getBookingStatus(), bookingInfo.getCheckIn(), bookingInfo.getCheckOut());
	}
//	Timestamp timestamp = new Timestamp(System.currentTimeMillis());
}
