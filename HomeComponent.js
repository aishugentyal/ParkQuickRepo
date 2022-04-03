import React, { Component } from 'react'

export default class HomeComponent extends Component {
    constructor(props){
        super(props);
        this.state={
          user:null
        }
        this.loginUser=this.loginUser.bind(this);
        this.registerUser=this.registerUser.bind(this);
        this.logout=this.logout.bind(this);
    }
    
    parkingList(){
      this.props.history.push("/parking-list");
    }

    loginUser(){
        this.props.history.push("/login");
      }

    registerUser(){
        this.props.history.push("/register-user");
    }  

    addParking(){
        this.props.history.push("/add-parking/-1");
    }

    goToBookings(){
        // let id = this.state.user.userId;
        this.props.history.push("/bookings/");
    }

    logout(){
      window.localStorage.clear();
      this.setState({user:null});
    }

    componentDidMount(){
      let session = window.localStorage.getItem("user");
      if(session){
        this.setState({user:JSON.parse(session)});
      } else {
        this.setState({user:null});
      }
    }

    render() {
      if(this.state.user === null){
        return (
          <div>
              <button className='btn btn-primary' onClick={()=>this.loginUser()}>Login</button>
              <button className='btn btn-primary' onClick={()=>this.registerUser()}>Register</button>
              <button className='btn btn-primary' onClick={()=>this.parkingList()}>Parking List</button>
          </div>
        )
      } else if (this.state.user && this.state.user.userRole === 'Owner'){
        return (
          <div>
              <button className='btn btn-primary' onClick={()=>this.addParking()}>Add New Parking</button>
              <button className='btn btn-primary' onClick={()=>this.parkingList()}>My Parking</button>
              <button className='btn btn-primary' onClick={()=>this.goToBookings()}>Bookings</button>
              <button className='btn btn-primary' onClick={()=>this.logout()}>LogOut</button>
          </div>
        )
      } else if (this.state.user && this.state.user.userRole === 'Customer'){
         return (
          <div>
              <button className='btn btn-primary' onClick={()=>this.parkingList()}>Parking List</button>
              <button className='btn btn-primary' onClick={()=>this.goToBookings()}>My Bookings</button>
              <button className='btn btn-primary' onClick={()=>this.logout()}>LogOut</button>
          </div>
        )
      }
    
  }
}
