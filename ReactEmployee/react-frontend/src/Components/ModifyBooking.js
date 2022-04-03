import React, { Component } from 'react'
import BookingService from '../services/BookingService';

export default class ModifyBooking extends Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.match.params.id,
            booking:{},
            user:{},
            parking:{}
        }
        this.goToBookings = this.goToBookings.bind(this);
        this.cancelBooking = this.cancelBooking.bind(this);
        this.modifyBooking = this.modifyBooking.bind(this);
    }

    goToBookings(){
        this.props.history.push("/bookings");
    }

    cancelBooking(){
        let id = this.state.booking.bookingId;
        BookingService.cancelBookingById(id).then((res)=>{
            alert('Booking cancelled successfully');
            this.props.history.push('/bookings');
        })
    }

    modifyBooking(){
        let booking = this.state.booking;
        booking.bookingStatus = document.querySelector('.booking_status').value;
        console.log('Booking: ',booking);
        BookingService.modifyBooking(booking).then((res)=>{
            alert('Booking modified successfully');
            this.props.history.push('/bookings');
        })
    }

    async componentDidMount(){
        await BookingService.getBookingById(this.state.id).then((res)=>{
            this.setState({
                booking:res.data,
                user:res.data.customerId,
                parking:res.data.parkingId
            });
        });
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
                        <h3 className="mb-5 text-uppercase">{this.state.parking.parkingName}</h3>

                        <div className="row">
                            <div className="col-md-6 mb-4">
                            <div className="form-outline">
                                <input type="text" className="form-control form-control-lg" disabled defaultValue={this.state.booking.bookingId} />
                                <label className="form-label" htmlFor="form3Example1m">Booking Id</label>
                            </div>
                            </div>
                            <div className="col-md-6 mb-4">
                            <div className="form-outline">
                                <input type="text" className="form-control form-control-lg" disabled defaultValue={this.state.user.firstName}/>
                                <label className="form-label" htmlFor="form3Example1n">Customer Name</label>
                            </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-4">
                            <div className="form-outline">
                                <input type="email" className="form-control form-control-lg" disabled defaultValue={this.state.booking.vehicleType} />
                                <label className="form-label" htmlFor="form3Example1m">Vehicle Type</label>
                            </div>
                            </div>
                            <div className="col-md-6 mb-4">
                            <div className="form-outline">
                                <input type="text" className="form-control form-control-lg" disabled defaultValue={this.state.booking.vehicleNo}/>
                                <label className="form-label" htmlFor="form3Example1m">Vehicle Number</label>
                            </div>
                            </div>
                        </div>

                        <div className="row">   
                            <div className="col-md-6 mb-4">
                            <label className="form-label" htmlFor="form3Example1n">Booking Status</label>
                            <div>
                            <select className="select booking_status">
                                <option value="Booked">Booked</option>
                                <option value="Parked">Parked</option>
                                <option value="Checked Out">Checked Out</option>
                            </select>
                            </div> 
                            </div>
                        </div>
                        <div className="d-flex justify-content-end pt-3">
                            <button type="button" className="btn btn-info btn-lg ms-2" onClick={this.goToBookings}>Go Back</button>
                            <button type="button" className="btn btn-danger btn-lg ms-2" onClick={this.cancelBooking}>Cancel Booking</button>
                            <button type="button" className="btn btn-success btn-lg ms-2" onClick={this.modifyBooking}>Modify Booking</button>
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
