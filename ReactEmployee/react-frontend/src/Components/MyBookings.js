import React, { Component } from 'react'
import BookingService from '../services/BookingService';

export default class MyBookings extends Component {
    constructor(props){
        super(props);
        this.state={
            user:{},
            bookings:[]
        }
    }

    async componentDidMount(){
        let session = JSON.parse(window.localStorage.getItem("user"));
        if(session){
          await this.setState({user:session});
        } else {
          await this.setState({user:null});
        }
        if(this.state.user && this.state.user.userRole === 'Owner'){
            await BookingService.getOwnerBookings(this.state.user.userId).then((res)=>{
                this.setState({bookings:res.data});
            });
        } else if(this.state.user && this.state.user.userRole === 'Customer'){
            await BookingService.getCustomerBookings(this.state.user.userId).then((res)=>{
                this.setState({bookings:res.data});
            });
        }
    }

    modifyParking(id){
        this.props.history.push(`/modifyBooking/${id}`)
    }

  render() {
      if(this.state && this.state.user && this.state.user.userRole === 'Customer'){
        return (
            <div>
                  <div className='row'>
                      <table className='table table-stripped table-bordered'>
                            <thead>
                                <tr>
                                    <th>Booking Id</th>
                                    <th>Parking Name</th>
                                    <th>Vehicle Number</th>
                                    <th>Vehicle Type</th>
                                    <th>Status</th>
                                    <th>Check In</th>
                                    <th>Check Out</th>
                                    <th>Total Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                  this.state.bookings.map(
                                    booking=>
                                      <tr key={booking}>
                                          <td>{booking.bookingId}</td>
                                          <td>{booking.parkingId.parkingName}</td>
                                          <td>{booking.vehicleNo}</td>
                                          <td>{booking.vehicleType}</td>
                                          <td>{booking.bookingStatus}</td>
                                          <td>{booking.checkIn}</td>
                                          <td>{booking.checkOut}</td> 
                                          <td>{booking.totalCost}</td>                   
                                      </tr>
                                  )
                                }
                            </tbody>
                      </table>
                
                  </div>
            </div>
          )
      } else if(this.state && this.state.user && this.state.user.userRole === 'Owner'){
        return (
            <div>
                  <div className='row'>
                      <table className='table table-stripped table-bordered'>
                            <thead>
                                <tr>
                                    <th>Booking Id</th>
                                    <th>Parking Name</th>
                                    <th>Vehicle Number</th>
                                    <th>Vehicle Type</th>
                                    <th>Status</th>
                                    <th>Check In</th>
                                    <th>Check Out</th>
                                    <th>Total Cost</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                  this.state.bookings.map(
                                    booking=>
                                      <tr key={booking}>
                                          <td>{booking.bookingId}</td>
                                          <td>{booking.parkingId.parkingName}</td>
                                          <td>{booking.vehicleNo}</td>
                                          <td>{booking.vehicleType}</td>
                                          <td>{booking.bookingStatus}</td> 
                                          <td>{booking.checkIn}</td>
                                          <td>{booking.checkOut}</td> 
                                          <td>{booking.totalCost}</td>
                                          <td>
                                              <button onClick={ () =>this.modifyParking(booking.bookingId)} className="btn btn-info">Modify Booking</button> 
                                          </td>                           
                                      </tr>
                                  )
                                }
                            </tbody>
                      </table>     
                  </div>
            </div>
          )
      } else {
          return (
              <button className='btn btn-primary'>Login</button>
          )
      }
    
  }
}
