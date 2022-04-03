import React, { Component } from 'react'
import ParkingService from '../services/ParkingService';

export default class AddParking extends Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.match.params.id,
            parkingId: null,
            parkingName:"",
            priceTwoWheeler:"",
            priceFourWheeler:"",
            parkingAddress:"",
            pincode:"",
            parkingArea:"",
            parkingAddrLongitude:"",
            parkingAddrLatitude:"",
            totalSlotTwoWheeler:"",
            totalSlotFourWheeler:"",
            userId:{}
        }
        this.changeParkingName=this.changeParkingName.bind(this);
        this.changeParkingArea=this.changeParkingArea.bind(this);
        this.changePrice2Wheeler=this.changePrice2Wheeler.bind(this);
        this.changePrice4Wheeler=this.changePrice4Wheeler.bind(this);
        this.changeParkingAddress=this.changeParkingAddress.bind(this);
        this.changePincode=this.changePincode.bind(this);
        this.changeAddrLong=this.changeAddrLong.bind(this);
        this.changeAddrLati=this.changeAddrLati.bind(this);
        this.changeTotalSlot2=this.changeTotalSlot2.bind(this);
        this.changeTotalSlot4=this.changeTotalSlot4.bind(this);
        this.cancelParking=this.cancelParking.bind(this);
    }

    async componentDidMount(){
      let session = JSON.parse(window.localStorage.getItem("user"));
      console.log('session object',session);
      if(!session){
        this.props.history.push("/login");
        return;
      } else if(session.userRole === 'Customer'){
        this.props.history.push("/");
        return;
      }
      console.log('session user',session);
      if(this.state.id === '-1'){
        console.log('-1 wala state');
        await this.setState({
          userId:session
        });
      } else {
        console.log('obj wala state');
        ParkingService.getParkingById(this.state.id).then((res)=>{
          let obj=res.data;
          console.log('parking data', obj);
          this.setState({
            id:obj.parkingId,
            parkingId:obj.parkingId,
            parkingName:obj.parkingName,
            priceTwoWheeler:obj.priceTwoWheeler,
            priceFourWheeler:obj.priceFourWheeler,
            parkingAddress:obj.parkingAddress,
            parkingAddrLongitude:obj.parkingAddrLongitude,
            parkingAddrLatitude:obj.parkingAddrLatitude,
            pincode:obj.pincode,
            parkingArea:obj.parkingArea,
            totalSlotTwoWheeler:obj.totalSlotTwoWheeler,
            totalSlotFourWheeler:obj.totalSlotFourWheeler,
            slotAvailableTwoWheeler:obj.slotAvailableTwoWheeler,
            slotAvailableFourWheeler:obj.slotAvailableFourWheeler,
            userId:obj.UserId
          });
        });
      }
    }

    changeAddrLong(e){
      this.setState({parkingAddrLongitude:e.target.value});
    }

    changeAddrLati(e){
      this.setState({parkingAddrLatitude:e.target.value});
    }

    changeParkingAddress(e){
      this.setState({parkingAddress:e.target.value});
    }

    changePincode(e){
      let data = e.target.value;
      if(isNaN(data)){
        alert('pincode should conain numbers only');
        this.setState({pincode:""});
        return;
      }
      if(data.toString().length > 6){
        alert('Pincode should contain 6 digits only');
        this.setState({pincode:""});
        return;
      }
      this.setState({pincode:e.target.value});
    }

    changePrice2Wheeler(e){
      let data = e.target.value;
      if(isNaN(data)){
        alert('please enter numbers for cost');
        this.setState({priceTwoWheeler:""});
        return;
      }
      this.setState({priceTwoWheeler:e.target.value});
    }

    changePrice4Wheeler(e){
      let data = e.target.value;
      if(isNaN(data)){
        alert('please enter numbers for cost');
        this.setState({priceFourWheeler:""});
        return;
      }
      this.setState({priceFourWheeler:e.target.value});
    }

    changeParkingName(event){
      this.setState({parkingName:event.target.value});
    }

    changeParkingArea(e){
      let data = e.target.value;
      if(isNaN(data)){
        alert('please enter numbers for Area');
        this.setState({parkingArea:""});
        return;
      }
      this.setState({parkingArea:e.target.value});
    }

    changeTotalSlot2(e){
      let data = e.target.value;
      if(isNaN(data)){
        alert('please enter numbers for Slots');
        this.setState({
          totalSlotTwoWheeler:"",
          slotAvailableTwoWheeler:""
        });
        return;
      }
      this.setState({
        totalSlotTwoWheeler:e.target.value,
        slotAvailableTwoWheeler:e.target.value
      });
    }

    changeTotalSlot4(e){
      let data = e.target.value;
      if(isNaN(data)){
        alert('please enter numbers for Slots');
        this.setState({
          totalSlotFourWheeler:"",
          slotAvailableFourWheeler:""
        });
        return;
      }
      this.setState({
        totalSlotFourWheeler:e.target.value,
        slotAvailableFourWheeler:e.target.value
      });
    }

    cancelParking(){
      this.props.history.push("/parking-list");
    }

    updateParking=(e)=>{
      // console.log('state',this.state)
      e.preventDefault();
      if(this.state.id === '-1'){
        this.addParking();
      }else{
        let park=this.state;
        ParkingService.UpdateParking(park).then((res)=>{    
          alert('Parking updated successfully');
          this.props.history.push("/parking-list");
        })
      }
    }

    addParking(){
      let park=this.state;
      console.log('add new wala state',park);
      ParkingService.addNewParking(park).then((res)=>{   
        alert('Parking added successfully'); 
        this.props.history.push("/parking-list");
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
                        style={{borderTopLeftRadius: ".25rem", borderBottomLeftRadius:" .25rem", height:"100%"}}
                      />
                    </div>
                    <div className="col-xl-6">
                      <div className="card-body p-md-5 text-black">
                        <h3 className="mb-5 text-uppercase">Register Your Parking Space</h3>

                        <div className="row">
                          <div className="col-md-8 mb-4">
                            <div className="form-outline">
                              <input type="text" id="form3Example1m" className="form-control form-control-lg" value={this.state.parkingName} onChange={this.changeParkingName}/>
                              <label className="form-label" htmlFor="form3Example1m">Parking name</label>
                            </div>
                          </div>
                          <div className="col-md-4 mb-4">
                            <div className="form-outline">
                              <input type="text" id="form3Example1n" className="form-control form-control-lg" value={this.state.parkingArea} onChange={this.changeParkingArea}/>
                              <label className="form-label" htmlFor="form3Example1n">Area in Sq.Ft</label>
                            </div>
                          </div>
                        </div>

                        <div className="form-outline mb-4">
                          <input type="text" id="form3Example8" className="form-control form-control-lg" value={this.state.parkingAddress} onChange={this.changeParkingAddress}/>
                          <label className="form-label" htmlFor="form3Example8">Address</label>
                        </div>

                              <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input type="text" id="form3Example1m1" className="form-control form-control-lg" value={this.state.totalSlotTwoWheeler} onChange={this.changeTotalSlot2}/>
                              <label className="form-label" htmlFor="form3Example1m1">Total Parkings (2 wheelers)</label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input type="text" id="form3Example1n1" className="form-control form-control-lg" value={this.state.totalSlotFourWheeler} onChange={this.changeTotalSlot4}/>
                              <label className="form-label" htmlFor="form3Example1n1">Total Parkings (4 wheelers)</label>
                            </div>
                          </div>
                        </div>

                              <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input type="text" id="form3Example1m1" className="form-control form-control-lg" value={this.state.priceTwoWheeler} onChange={this.changePrice2Wheeler}/>
                              <label className="form-label" htmlFor="form3Example1m1">Cost/hour (2 wheelers)</label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input type="text" id="form3Example1n1" className="form-control form-control-lg" value={this.state.priceFourWheeler} onChange={this.changePrice4Wheeler}/>
                              <label className="form-label" htmlFor="form3Example1n1">Cost/hour (4 wheelers)</label>
                            </div>
                          </div>
                        </div>

                              <div className="row">
                          <div className="col-md-4 mb-4">
                            <div className="form-outline">
                              <input type="text" id="form3Example1m1" className="form-control form-control-lg" value={this.state.parkingAddrLatitude} onChange={this.changeAddrLati}/>
                              <label className="form-label" htmlFor="form3Example1m1">Lattitude</label>
                            </div>
                          </div>
                          <div className="col-md-4 mb-4">
                            <div className="form-outline">
                              <input type="text" id="form3Example1n1" className="form-control form-control-lg" value={this.state.parkingAddrLongitude} onChange={this.changeAddrLong}/>
                              <label className="form-label" htmlFor="form3Example1n1">Longitude</label> 
                            </div>
                          </div>
                        </div>

                              <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="form-outline">
                              <input type="text" id="form3Example1m1" className="form-control form-control-lg" value={this.state.pincode} onChange={this.changePincode}/>
                              <label className="form-label" htmlFor="form3Example1m1">Pincode</label>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-end pt-3">
                          <button type="button" className="btn btn-secondary btn-lg ms-2" onClick={this.cancelParking}>Cancel</button>
                          <button type="button" className="btn btn-primary btn-lg ms-2" onClick={this.updateParking}>Save</button>
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
