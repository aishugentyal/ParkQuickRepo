package com.ParkQuickBackend.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;



@Entity
@Table(name="user")
public class UserInfo
{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int userId;
	
	private String firstName;
	
	private String lastName;
	
	@Column(unique=true,name="email_id")
	private String emailId;
	
	private String address;
	
	private String password;
	
	private String mobileNo;
	
	private String addharNo;
	
	private String userRole;
	

	public UserInfo() {}


	public UserInfo(int userId, String firstName, String lastName, String emailId, String address, String password,
			String mobileNo, String addharNo, String userRole) {
		super();
		this.userId = userId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.address = address;
		this.password = password;
		this.mobileNo = mobileNo;
		this.addharNo = addharNo;
		this.userRole = userRole;
	}


	public int getUserId() {
		return userId;
	}


	public void setUserId(int userId) {
		this.userId = userId;
	}


	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public String getEmailId() {
		return emailId;
	}


	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getMobileNo() {
		return mobileNo;
	}


	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}


	public String getAddharNo() {
		return addharNo;
	}


	public void setAddharNo(String addharNo) {
		this.addharNo = addharNo;
	}


	public String getUserRole() {
		return userRole;
	}


	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}


	@Override
	public String toString() {
		return "UserInfo [userId=" + userId + ", firstName=" + firstName + ", lastName=" + lastName + ", emailId="
				+ emailId + ", address=" + address + ", password=" + password + ", mobileNo=" + mobileNo + ", addharNo="
				+ addharNo + ", userRole=" + userRole + "]";
	}
}
