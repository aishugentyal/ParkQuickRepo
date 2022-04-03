package com.ParkQuickBackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ParkQuickBackend.entity.ParkingInfo;
import com.ParkQuickBackend.entity.UserInfo;
import com.ParkQuickBackend.repository.ParkingInfoRepository;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/parking/v2")
public class ParkingInfoController 
{
	@Autowired
	private ParkingInfoRepository parkingRepository;
	
	@GetMapping("/allparkings")
	public List<ParkingInfo> getAllParking(){
		return parkingRepository.findAll();
	}
	
	@GetMapping("/deleteParking/{id}")
	public List<ParkingInfo> deleteParking(@PathVariable int id) {
		parkingRepository.deleteById(id);
		return parkingRepository.findAll();
	}
	
	@GetMapping("/findParkingById/{id}")
	public ParkingInfo findParkingById(@PathVariable int id){
		return parkingRepository.findById(id).get();
	}
	
	@PostMapping("/updateParking")
	public void UpdateParking(@RequestBody ParkingInfo parking){
		System.out.println("parking Id: "+parking.getParkingId());
		boolean isParkingExists = parkingRepository.findById(parking.getParkingId()).isPresent();
		if(isParkingExists) {
			parkingRepository.deleteById(parking.getParkingId());
		}
		parkingRepository.save(parking);
	}
	
	@PostMapping("/addNewParking")
	public void addNewParking(@RequestBody ParkingInfo parking){
		System.out.println("inside add new parking");
		parkingRepository.save(parking);
	}
	
	@PostMapping("/getParkingsByUser")
	public List<ParkingInfo> getParkingsByUser(@RequestBody UserInfo userInfo){
		List<ParkingInfo> list = parkingRepository.getParkingsByUser(userInfo.getUserId());
		return list;
	}
	
}
