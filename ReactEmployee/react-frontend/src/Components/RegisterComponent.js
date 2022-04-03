import React, { Component } from 'react'
import UserService from '../services/UserService';

export default class RegisterComponent extends Component {
  constructor(props){
    super(props);
    this.state={
      // id:this.props.match.params.id,
      firstName:"",
      lastName:"",
      emailId:"",
      address:"",
      password:"",
      mobileNo:"",
      addharNo:"",
      userRole:""
    }
    this.changeFirstName = this.changeFirstName.bind(this);
    this.changeLastName = this.changeLastName.bind(this);
    this.changeEmailId=this.changeEmailId.bind(this);
    this.changeMobileNo=this.changeMobileNo.bind(this);
    this.changeAddress=this.changeAddress.bind(this);
    this.changePassword=this.changePassword.bind(this);
    this.changeAadhar=this.changeAadhar.bind(this);
    this.changeUserRole=this.changeUserRole.bind(this);
    this.verifyPassword=this.verifyPassword.bind(this);
  }

  componentDidMount(){
    let role = document.querySelector('.user_role').value;
    console.log('role: ', role);
    this.setState({userRole:role});
  }

  changeFirstName(e){
    // console.log('firstname: ',e.target.value);
    this.setState({firstName:e.currentTarget.value});
  }

  changeLastName(e){
    this.setState({lastName:e.target.value});
  }

  changeEmailId(e){
    this.setState({emailId:e.target.value});
  }

  changeMobileNo(e){
    let data = e.target.value;
    if(isNaN(data)){
      alert('Please enter a valid mobile number');
      e.target.value="";
      return;
    }
    this.setState({mobileNo:e.target.value});
  }

  changeAddress(e){
    this.setState({address:e.target.value});
  }

  changePassword(e){
    this.setState({password:e.target.value});
  }

  verifyPassword(e){
    let data = e.target.value;
    let password = this.state.password;
    console.log('original password', password);
    console.log('new password', data);
    if(!password.includes(data)){
      alert('please verify. password not matching');
      e.target.value="";
      return;
    }
  }

  changeAadhar(e){
    let data=e.target.value;
    if(isNaN(data)){
      alert("Please enter valid Aadhar");
      e.target.value="";
      return;
    }
    this.setState({addharNo:e.target.value});
  }

  changeUserRole(e){
    let role = document.querySelector('.user_role').value;
    console.log('role: ', role);
    this.setState({userRole:role});
  }

  registerUser=(e)=>{
    e.preventDefault();
    let users=this.state;
    let verifyPassword = document.querySelector('.verify_password').value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(users.firstName === "" || users.lastName === "" || users.emailId === "" || users.address === "" || users.password === "" || users.mobileNo === "" || users.addharNo === "" || verifyPassword === ""){
      alert('Please fill all the fields');
      return;
    }
    if(!regex.test(this.state.emailId)){
      alert('Invalid Email Id!!!!');
      return;
    }
    if(this.state.mobileNo.toString().length !== 10){
      alert('Invalid mobile Number!!!!');
      return;
    }
    if(this.state.password !== verifyPassword){
      alert('Password not matching!!!!');
      return;
    }
    if(this.state.addharNo.toString().length !== 12){
      alert('Please Enter valid Aadhar Number!!!!');
      return;
    }
    UserService.addUser(users).then((res)=>{
      console.log("users Info: "+res.data);
      if(res.data){
        alert("User already exists, Please register using different emailId OR try to login");
      } else {
        alert("Registraction Successful. Please login!!!");
        this.props.history.push("/login");
        console.log("User inserted");
      }
    })

  }

  render() {
    return (
      <div>
          <section className="h-100 bg-dark">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <div className="card card-registration my-4">
          <div className="row g-0">
            <div className="col-xl-6 d-none d-xl-block">
              <img
                src="https://www.ledgerinsights.com/wp-content/uploads/2020/05/parking-lot-cars.jpg"
                alt="Sample pic"
                className="img-fluid"
                style={{borderTopLeftRadius: ".25rem", borderBottomLeftRadius:" .25rem", height: "100%"}}
              />
            </div>
            <div className="col-xl-6">
              <div className="card-body p-md-5 text-black">
                <h3 className="mb-5 text-uppercase">Registration Yourself</h3>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" className="form-control form-control-lg" onChange={this.changeFirstName} />
                      <label className="form-label" htmlFor="form3Example1m">First name</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" className="form-control form-control-lg" onChange={this.changeLastName} />
                      <label className="form-label" htmlFor="form3Example1n">Last name</label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-7 mb-4">
                    <div className="form-outline">
                      <input type="email" className="form-control form-control-lg" onChange={this.changeEmailId} />
                      <label className="form-label" htmlFor="form3Example1m">Email Id</label>
                    </div>
                  </div>
                  <div className="col-md-5 mb-4">
                    <div className="form-outline">
                      <input type="text" className="form-control form-control-lg" onChange={this.changeMobileNo}/>
                      <label className="form-label" htmlFor="form3Example1m">Mobile No</label>
                    </div>
                  </div>
                </div>

                <div className="form-outline mb-4">
                  <input type="text" className="form-control form-control-lg" onChange={this.changeAddress}/>
                  <label className="form-label" htmlFor="form3Example8">Address</label>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="password" className="form-control form-control-lg" onChange={this.changePassword}/>
                      <label className="form-label" htmlFor="form3Example1m">Password</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="password" className="form-control form-control-lg verify_password" onChange={this.verifyPassword}/>
                      <label className="form-label" htmlFor="form3Example1n">Re-enter Password</label>
                    </div>
                  </div>
                </div>
                <div className="row">   
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" className="form-control form-control-lg" onChange={this.changeAadhar}/>
                      <label className="form-label" htmlFor="form3Example1n">Aadhar Number</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                  <label className="form-label" htmlFor="form3Example1n">Register As</label>
                  <div>
                    <select className="select user_role" onChange={this.changeUserRole}>
                      <option value="Customer">Customer</option>
                      <option value="Owner">Owner</option>
                    </select>
                    </div> 
                  </div>
                </div>
                <div className="d-flex justify-content-end pt-3">
                  {/* <button type="button" className="btn btn-light btn-lg">Reset all</button> */}
                  <button type="button" className="btn btn-warning btn-lg ms-2" onClick={this.registerUser}>Submit form</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      </div>
    )
  }
}
