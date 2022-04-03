package com.ParkQuickBackend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ParkQuickBackend.entity.UserInfo;
import com.ParkQuickBackend.repository.UserInfoRepository;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/user/v1")
public class UserInfoController {

	@Autowired
	private UserInfoRepository userRepository;
	
	//add users
	@PostMapping("/register")
	public boolean addUser(@RequestBody UserInfo user) {
		String email = userRepository.checkEmail(user.getEmailId());
		System.out.println("repo string "+ email);
		if(email == null) {
			userRepository.save(user);
			return false;
		} else {
			return true;
		}
//		System.out.println("user object"+adduser);
//		return userRepository.save(adduser);
	}
	
	@PostMapping("/loginUser")
	public UserInfo loginUser(@RequestBody UserInfo userInfo) {
		System.out.println("received email: "+userInfo.getEmailId());
		System.out.println("received password: "+userInfo.getPassword());
		UserInfo validateUser = userRepository.checkUser(userInfo.getEmailId(), userInfo.getPassword());
		System.out.println("validateUser: "+validateUser);
		return validateUser;
	}
	
	
	
	
}
