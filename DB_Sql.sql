use ParkQuick_DB;
create database ParkQuick_DB;

show tables;
ALTER TABLE User_info_tbl
Change user_Role user_Roll varchar(100);

desc User_info_tbl;
desc Parking_space_info_tbl;
desc Booking_info_tbl;




create table User_info_tbl(user_id int primary key auto_increment,
user_firstName varchar(100),
user_lastName varchar(100),
user_email_id varchar(100) unique,
user_Role varchar(100),
user_pwd varchar(100),
user_address varchar(200),
user_mobile_no varchar(10),
user_aadhar_no varchar(20));


insert into  user_info_tbl values
(1,'himanshu','patil','patilhimanshu@gmail.com','user','abc@123',"17,vadgaon budruk,kamal nagar,pune",'7948532525','22282201666'),
(2,'aishwarya','gentyal','gentyalaishu@gmail.com','owner','xyz@123',"05,ashok apartment,geeta nagar,solapur",'9852367410','25282201666'),
(3,'bhagyashri','dhanak','dhanakbhagyashree@gmail.com','user','pqr@123',"08,ruhi apartment,tarwala nagar,nashik",'8005646740','25282247666'),
(4,'rushabh','sontakke','sontakkerushabh@gmail.com','owner','klh@123',"07,deep apartment,shri nagar,parbhani",'9852368510','25282207656');

table User_info_tbl;

create table Parking_space_info_tbl(parking_id int primary key auto_increment,
parking_name varchar(100), 
parking_address varchar(200),
parking_pincode int, 
user_id int,
parking_area_in_sqft varchar(10),
parking_addr_latitude varchar(20),
parking_addr_longitude varchar(20),
parking_per_hr_price int,
total_slots_2_wheeler int,
total_slots_4_wheeler int,
slot_available_2_wheeler int,
slot_available_4_wheeler int,
foreign key (user_id) references User_info_tbl (user_id));


 insert into parking_space_info_tbl values
 (10,"park it down","Parking Lot, B, 1/2, Lane Number 6, Ragvilas Society, Koregaon Park, Pune, Maharashtra",42202,3,'1200','18.460806','73.858132',20,10,5,5,2),
 (11,"campus side bikes","Parking Lot, A, 1/3, Lane Number 4, shiv Society, pramod Park, Pune Maharashtra",42502,2,'1500','18.9854','74.5689',30,20,10,3,4),
 (12,"front parking","Parking Lot, C, 1/4, Lane Number 8, banganga Society, Krishna Park, Pune, Maharashtra",42542,1,'1800','18.4546','73.8542',25,15,6,4,3);

table parking_space_info_tbl;

create table Booking_info_tbl(
booking_id int primary key,
owner_id int,
customer_id int,
parking_id int,
vehicle_type varchar(10),
vehicle_number varchar(30),
check_in datetime,
check_out datetime,
total_cost int,
booking_status varchar(20),
foreign key (owner_id) references User_info_tbl (user_id),
foreign key (customer_id) references User_info_tbl (user_id),
foreign key (parking_id) references Parking_space_info_tbl(parking_id));


insert into booking_info_tbl values
(1,2,3,11,"2 wheeler",'MH13DY3678',"2022-02-28 15:00:00","2022-02-28 16:00:00",25,'checkout'),
(2,4,3,12,"2 wheeler",'MH12kl7628',"2022-02-25 01:00:00","2022-02-25 02:00:00",30,'inprogress'),
(3,2,1,10,"4 wheeler",'MH15HN3178',"2022-02-27 08:30:00","2022-02-27 09:00:00",25,'checkout');

table booking_info_tbl;
