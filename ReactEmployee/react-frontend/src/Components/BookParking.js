import React, { Component } from 'react'
import ParkingService from '../services/ParkingService'
import BookingService from '../services/BookingService'

export default class BookParking extends Component {
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            vehicleType:"",
            vehicleNo:"",
            totalCost:"",
            customerId :{},
            parkingId: {}
        }
        this.changeVehicletype = this.changeVehicletype.bind(this);
        this.changeVehicleNumber = this.changeVehicleNumber.bind(this);
        this.goToParkings = this.goToParkings.bind(this);
    }

    async componentDidMount(){
        let customer = JSON.parse(window.localStorage.getItem("user"));
        await ParkingService.getParkingById(this.state.id).then((res)=>{
            console.log('response', res);
            this.setState({
                parkingId: res.data,
                customerId:customer
            });
        });
        let vehicletype = document.querySelector('.vehicle_type').value;
        let totalCost = this.state.parkingId.priceTwoWheeler;
        console.log('this.state.parkingId',this.state.parkingId);
        console.log('total cost',totalCost);
        await this.setState({
            vehicleType:vehicletype,
            totalCost: totalCost
        });
    }

    changeVehicleNumber(e){
        this.setState({
            vehicleNo: e.target.value
        })
    }

    changeVehicletype(e){
        if(e.target.value === '2 Wheeler'){
            this.setState({
                vehicleType: e.target.value,
                totalCost:this.state.parkingId.priceTwoWheeler
            })
        } else if(e.target.value === '4 Wheeler'){
            this.setState({
                vehicleType: e.target.value,
                totalCost:this.state.parkingId.priceFourWheeler
            })
        }
    }

    goToParkings(){
        this.props.history.push("/parking-list");
    }

    bookParking=(e)=>{
        e.preventDefault();
        let obj = {
            vehicleType:this.state.vehicleType,
            vehicleNo:this.state.vehicleNo,
            totalCost:this.state.totalCost,
            customerId :this.state.customerId,
            parkingId: this.state.parkingId
        };
        BookingService.bookParking(obj).then((res)=>{
            if(res.data){
                alert('Booking Successful');
                this.props.history.push('/');
            }
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
                        style={{borderTopLeftRadius: ".25rem", borderBottomLeftRadius:" .25rem", height:"100%"}}
                      />
                    </div>
                    <div className="col-xl-6">
                      <div className="card-body p-md-5 text-black">
                        <h3 className="mb-5 text-uppercase">{this.state.parkingId.parkingName}</h3>

                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input type="text" defaultValue={this.state.parkingId.slotAvailableTwoWheeler} className="form-control form-control-lg" disabled/>
                              <label className="form-label" htmlFor="form3Example1m">Slots Available for 2 Wheelers</label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input type="text" defaultValue={this.state.parkingId.slotAvailableFourWheeler} className="form-control form-control-lg" disabled/>
                              <label className="form-label" htmlFor="form3Example1n">Slots Available for 4 Wheelers</label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input type="text" defaultValue={this.state.parkingId.priceTwoWheeler} className="form-control form-control-lg" disabled/>
                              <label className="form-label" htmlFor="form3Example1m1">Charges for 2 Wheelers</label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input type="text" defaultValue={this.state.parkingId.priceFourWheeler} className="form-control form-control-lg" disabled/>
                              <label className="form-label" htmlFor="form3Example1n1">Charges for 4 Wheelers</label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <div className="form-outline">
                                    <input type="text" className="form-control form-control-lg" value={this.state.vehicleNo} onChange={this.changeVehicleNumber}/>
                                    <label className="form-label" htmlFor="form3Example1m1">Vehicle Number</label>
                                </div>
                            </div>
                        
                            <div className="col-md-6 mb-4">
                                <label className="form-label" htmlFor="form3Example1n">Vehicle Type</label>
                                <div>
                                    <select className="select vehicle_type" value={this.state.vehicleType} onChange={this.changeVehicletype}>
                                        <option value="2 Wheeler">2 Wheeler</option>
                                        <option value="4 Wheeler">4 Wheeler</option>
                                    </select>
                                </div> 
                            </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4 mb-4">
                            <div className="form-outline">
                              <input type="text" className="form-control form-control-lg" defaultValue={this.state.totalCost} disabled />
                              <label className="form-label" htmlFor="form3Example1m1">Final Charges</label>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-end pt-3">
                          <button type="button" className="btn btn-secondary btn-lg ms-2" onClick={this.goToParkings}>Cancel</button>
                          <button type="button" className="btn btn-primary btn-lg ms-2" onClick={this.bookParking}>Book</button>
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
