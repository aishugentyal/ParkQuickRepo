package com.ParkQuickBackend.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="parking_space")
public class ParkingInfo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int parkingId;
	
	private String parkingName;
	
	private int priceTwoWheeler;
	
	private int priceFourWheeler;
	
	private String parkingAddress;
	
	private String parkingAddrLongitude;
	
	private String parkingAddrLatitude;
	
	private String pincode;
	
	private String parkingArea;
	
	private int totalSlotTwoWheeler;
	
	private int totalSlotFourWheeler;
		
	private int slotAvailableTwoWheeler;
	
	private int slotAvailableFourWheeler;
	
	@ManyToOne
	@JoinColumn(name="userId")
	private UserInfo userId;
	

	public ParkingInfo() {
		
	}


	public ParkingInfo(int parkingId, String parkingName, int priceTwoWheeler, int priceFourWheeler,
			String parkingAddress, String parkingAddrLongitude, String parkingAddrLatitude, String pincode,
			String parkingArea, int totalSlotTwoWheeler, int totalSlotFourWheeler, int slotAvailableTwoWheeler,
			int slotAvailableFourWheeler, UserInfo userId) {
		super();
		this.parkingId = parkingId;
		this.parkingName = parkingName;
		this.priceTwoWheeler = priceTwoWheeler;
		this.priceFourWheeler = priceFourWheeler;
		this.parkingAddress = parkingAddress;
		this.parkingAddrLongitude = parkingAddrLongitude;
		this.parkingAddrLatitude = parkingAddrLatitude;
		this.pincode = pincode;
		this.parkingArea = parkingArea;
		this.totalSlotTwoWheeler = totalSlotTwoWheeler;
		this.totalSlotFourWheeler = totalSlotFourWheeler;
		this.slotAvailableTwoWheeler = slotAvailableTwoWheeler;
		this.slotAvailableFourWheeler = slotAvailableFourWheeler;
		this.userId = userId;
	}


	public int getParkingId() {
		return parkingId;
	}


	public void setParkingId(int parkingId) {
		this.parkingId = parkingId;
	}


	public String getParkingName() {
		return parkingName;
	}


	public void setParkingName(String parkingName) {
		this.parkingName = parkingName;
	}


	public int getPriceTwoWheeler() {
		return priceTwoWheeler;
	}


	public void setPriceTwoWheeler(int priceTwoWheeler) {
		this.priceTwoWheeler = priceTwoWheeler;
	}


	public int getPriceFourWheeler() {
		return priceFourWheeler;
	}


	public void setPriceFourWheeler(int priceFourWheeler) {
		this.priceFourWheeler = priceFourWheeler;
	}


	public String getParkingAddress() {
		return parkingAddress;
	}


	public void setParkingAddress(String parkingAddress) {
		this.parkingAddress = parkingAddress;
	}


	public String getParkingAddrLongitude() {
		return parkingAddrLongitude;
	}


	public void setParkingAddrLongitude(String parkingAddrLongitude) {
		this.parkingAddrLongitude = parkingAddrLongitude;
	}


	public String getParkingAddrLatitude() {
		return parkingAddrLatitude;
	}


	public void setParkingAddrLatitude(String parkingAddrLatitude) {
		this.parkingAddrLatitude = parkingAddrLatitude;
	}


	public String getPincode() {
		return pincode;
	}


	public void setPincode(String pincode) {
		this.pincode = pincode;
	}


	public String getParkingArea() {
		return parkingArea;
	}


	public void setParkingArea(String parkingArea) {
		this.parkingArea = parkingArea;
	}


	public int getTotalSlotTwoWheeler() {
		return totalSlotTwoWheeler;
	}


	public void setTotalSlotTwoWheeler(int totalSlotTwoWheeler) {
		this.totalSlotTwoWheeler = totalSlotTwoWheeler;
	}


	public int getTotalSlotFourWheeler() {
		return totalSlotFourWheeler;
	}


	public void setTotalSlotFourWheeler(int totalSlotFourWheeler) {
		this.totalSlotFourWheeler = totalSlotFourWheeler;
	}


	public int getSlotAvailableTwoWheeler() {
		return slotAvailableTwoWheeler;
	}


	public void setSlotAvailableTwoWheeler(int slotAvailableTwoWheeler) {
		this.slotAvailableTwoWheeler = slotAvailableTwoWheeler;
	}


	public int getSlotAvailableFourWheeler() {
		return slotAvailableFourWheeler;
	}


	public void setSlotAvailableFourWheeler(int slotAvailableFourWheeler) {
		this.slotAvailableFourWheeler = slotAvailableFourWheeler;
	}


	public UserInfo getUserId() {
		return userId;
	}


	public void setUserId(UserInfo userId) {
		this.userId = userId;
	}


	@Override
	public String toString() {
		return "ParkingInfo [parkingId=" + parkingId + ", parkingName=" + parkingName + ", priceTwoWheeler="
				+ priceTwoWheeler + ", priceFourWheeler=" + priceFourWheeler + ", parkingAddress=" + parkingAddress
				+ ", parkingAddrLongitude=" + parkingAddrLongitude + ", parkingAddrLatitude=" + parkingAddrLatitude
				+ ", pincode=" + pincode + ", parkingArea=" + parkingArea + ", totalSlotTwoWheeler="
				+ totalSlotTwoWheeler + ", totalSlotFourWheeler=" + totalSlotFourWheeler + ", slotAvailableTwoWheeler="
				+ slotAvailableTwoWheeler + ", slotAvailableFourWheeler=" + slotAvailableFourWheeler + ", userId="
				+ userId + "]";
	}

	
	
}
