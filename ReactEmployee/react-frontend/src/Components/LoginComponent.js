import React, { Component } from 'react'
import UserService from '../services/UserService';
import './LoginComponent.css';

export default class LoginComponent extends Component {
    constructor(props){
        super(props);
        this.state={
          emailId:"",
          password:""
        }
        this.registerUser=this.registerUser.bind(this);
    }

    registerUser(){
      this.props.history.push("/register-user");
    }

    componentDidMount(){
      let session = window.localStorage.getItem("user");
      if(session){
        this.props.history.push("/");
      }
    }

    loginUser=(e)=>{
      e.preventDefault();
      let email = document.querySelector('.email').value;
      let password = document.querySelector('.password').value;
      console.log('sending email',email);
      console.log('sending password',password);
      let user = {
        emailId:email,
        password:password
      }
      console.log('user',user);
      UserService.loginUser(user).then((res)=>{
        if(res.data){
          let role = res.data.userRole;
          window.localStorage.setItem("user",JSON.stringify(res.data));
          this.props.history.push("/");
        }else{
          alert("oops... Credentials are not valid!!!")
        }
      });
    }

    render() {
    return (
      <div className='login_container'>
          <div className='login_form'>
            <div className="form-outline mb-4">
                <input type="email" id="form2Example1" className="form-control email" />
                <label className="form-label">Email address</label>
            </div>
            <div className="form-outline mb-4">
                <input type="password" id="form2Example2" className="form-control password" />
                <label className="form-label">Password</label>
            </div>
            <button type="button" className="btn btn-primary btn-block mb-4" onClick={this.loginUser}>Sign in</button>
            <div className="text-center">
              <p>Not a member? <button className='btn btn-primary' onClick={()=>this.registerUser()}>Register</button> </p>
            </div> 
          </div>
      </div>
    )
  }
}
