package com.ParkQuickBackend.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name="bookings")
public class BookingInfo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)	
	private int bookingId;
	
	private String vehicleType;
	
	private String vehicleNo;
	
	private String checkIn;
	
	private String checkOut;
	
	private String bookingStatus;
	
	private int totalCost;
	
	@ManyToOne
	@JoinColumn(name="userId")
	private UserInfo customerId;
	
	@ManyToOne
	@JoinColumn(name="parkingId")
	private ParkingInfo parkingId;

	public BookingInfo() {
		super();
		// TODO Auto-generated constructor stub
	}

	public BookingInfo(int bookingId, String vehicleType, String vehicleNo, String checkIn, String checkOut,
			String bookingStatus, int totalCost, UserInfo customerId, ParkingInfo parkingId) {
		super();
		this.bookingId = bookingId;
		this.vehicleType = vehicleType;
		this.vehicleNo = vehicleNo;
		this.checkIn = checkIn;
		this.checkOut = checkOut;
		this.bookingStatus = bookingStatus;
		this.totalCost = totalCost;
		this.customerId = customerId;
		this.parkingId = parkingId;
	}

	public int getBookingId() {
		return bookingId;
	}

	public void setBookingId(int bookingId) {
		this.bookingId = bookingId;
	}

	public String getVehicleType() {
		return vehicleType;
	}

	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}

	public String getVehicleNo() {
		return vehicleNo;
	}

	public void setVehicleNo(String vehicleNo) {
		this.vehicleNo = vehicleNo;
	}

	public String getCheckIn() {
		return checkIn;
	}

	public void setCheckIn(String checkIn) {
		this.checkIn = checkIn;
	}

	public String getCheckOut() {
		return checkOut;
	}

	public void setCheckOut(String checkOut) {
		this.checkOut = checkOut;
	}

	public String getBookingStatus() {
		return bookingStatus;
	}

	public void setBookingStatus(String bookingStatus) {
		this.bookingStatus = bookingStatus;
	}

	public int getTotalCost() {
		return totalCost;
	}

	public void setTotalCost(int totalCost) {
		this.totalCost = totalCost;
	}

	public UserInfo getCustomerId() {
		return customerId;
	}

	public void setCustomerId(UserInfo customerId) {
		this.customerId = customerId;
	}

	public ParkingInfo getParkingId() {
		return parkingId;
	}

	public void setParkingId(ParkingInfo parkingId) {
		this.parkingId = parkingId;
	}

	@Override
	public String toString() {
		return "BookingInfo [bookingId=" + bookingId + ", vehicleType=" + vehicleType + ", vehicleNo=" + vehicleNo
				+ ", checkIn=" + checkIn + ", checkOut=" + checkOut + ", bookingStatus=" + bookingStatus
				+ ", totalCost=" + totalCost + ", customerId=" + customerId + ", parkingId=" + parkingId + "]";
	}
	
	
}
