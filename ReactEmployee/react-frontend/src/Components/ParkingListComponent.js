import React, { Component } from 'react'
import ParkingService from '../services/ParkingService'
import './ParkingListComponent.css';


export default class ParkingListComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            parkings:[],
            parkingObj:{},
            user:null
        }
        
    }

    editParking(id){
        this.props.history.push(`/add-parking/${id}`);
    }

    deleteParking(id){
        ParkingService.deleteParking(id).then((res)=>{
            this.setState({parkings:res.data});
        })
    }

    viewParking(id){
        this.state.parkings.forEach( (element) => {
            if(element.parkingId === id){
                this.setState({parkingObj:element});
            }
        });
        document.querySelector('.view_modal').className = 'view_modal active';
    }

    goToBooking(id){
        this.props.history.push(`/book-parking/${id}`);
    }
    
    closeModal(){
        document.querySelector('.view_modal').className = 'view_modal';
    }



    async componentDidMount(){
        let session = JSON.parse(window.localStorage.getItem("user"));
        console.log('session: ',session);
        await this.setState({user:session});
        console.log('this.state: ',this.state);
        if(this.state && this.state.user && this.state.user.userRole === 'Owner'){
            console.log('owner parking list');
            ParkingService.getParkingByUser(this.state.user).then((res)=>{
                console.log('res: ',res);
                this.setState({parkings:res.data});
            });
        } else {
            console.log('common parking list');
            ParkingService.getParking().then((res)=>{
                console.log('res: ',res);
                this.setState({parkings:res.data});
            });
        }
    }
    
    render() {
        if(this.state.user === null){
            return (
                <div>
                      <h2 className='text-center'>List of Parking spaces</h2>
                  
                    <div className='row'>
                      <table className='table table-stripped table-bordered'>
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Address</th>
                              <th>Available (2 Wheeler)</th>
                              <th>Available (4 Wheeler)</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                              this.state.parkings.map(
                                  parking=>
                                  <tr key={parking.parkingId}>
                                      <td>{parking.parkingName}</td>
                                      <td>{parking.parkingAddress}</td>
                                      <td>{parking.slotAvailableTwoWheeler}</td>
                                      <td>{parking.slotAvailableFourWheeler}</td>
                                      <td>
                                          <button style={{marginLeft:"10px"}} onClick={ () =>this.viewParking(parking.parkingId)} className="btn btn-info">View</button>
                                      </td>                           
                                  </tr>
                              )
                          }
                      </tbody>
                      </table>
          
                    </div>
          
                    <div className='view_modal'>
                      <div className='content'>
                          <div className='title'>{this.state.parkingObj.parkingName}</div>
                          <div className='content_table'>
                              <div className='header'>
                                  <div>Parking Id</div>
                                  <div>Charges for 2 Wheeler(per hour)</div>
                                  <div>Charges for 4 Wheeler(per hour)</div>
                                  <div>Address</div>
                                  <div>Longitude</div>
                                  <div>Lattitude</div>
                                  <div>Pincode</div>
                                  <div>Area(in sq.ft)</div>
                                  <div>Total 2 wheeler slots</div>
                                  <div>Total 4 wheeler slots</div>
                                  <div>Available 2 wheeler slots</div>
                                  <div>Available 4 wheeler slots</div>
                              </div>
                              <div className='data'>
                                  <div>{this.state.parkingObj.parkingId}</div>
                                  <div>Rs.{this.state.parkingObj.priceTwoWheeler}</div>
                                  <div>Rs.{this.state.parkingObj.priceFourWheeler}</div>
                                  <div>{this.state.parkingObj.parkingAddress}</div>
                                  <div>{this.state.parkingObj.parkingAddrLongitude}</div>
                                  <div>{this.state.parkingObj.parkingAddrLatitude}</div>
                                  <div>{this.state.parkingObj.pincode}</div>
                                  <div>{this.state.parkingObj.parkingArea}</div>
                                  <div>{this.state.parkingObj.totalSlotTwoWheeler}</div>
                                  <div>{this.state.parkingObj.totalSlotFourWheeler}</div>
                                  <div>{this.state.parkingObj.slotAvailableTwoWheeler}</div>
                                  <div>{this.state.parkingObj.slotAvailableFourWheeler}</div>                       
                              </div>
                          </div>
                      </div>
                      <button className='btn btn-secondary' onClick={this.closeModal}>Close</button>
                    </div>
                </div>
              )
        }else if (this.state.user && this.state.user.userRole === 'Owner'){
            return (
                <div>
                      <h2 className='text-center'>List of Parking spaces</h2>
                  
                    <div className='row'>
                      <table className='table table-stripped table-bordered'>
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Address</th>
                              <th>Available (2 Wheeler)</th>
                              <th>Available (4 Wheeler)</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                              this.state.parkings.map(
                                  parking=>
                                  <tr key={parking.parkingId}>
                                      <td>{parking.parkingName}</td>
                                      <td>{parking.parkingAddress}</td>
                                      <td>{parking.slotAvailableTwoWheeler}</td>
                                      <td>{parking.slotAvailableFourWheeler}</td>
                                      <td>
                                          <button onClick={()=>this.editParking(parking.parkingId)} className="btn btn-info">Update</button>
                                          <button style={{marginLeft:"10px"}} onClick={ () =>this.deleteParking(parking.parkingId)} className="btn btn-danger">Delete</button>
                                          <button style={{marginLeft:"10px"}} onClick={ () =>this.viewParking(parking.parkingId)} className="btn btn-info">View</button>
                                      </td>                           
                                  </tr>
                              )
                          }
                      </tbody>
                      </table>
          
                    </div>
          
                    <div className='view_modal'>
                      <div className='content'>
                          <div className='title'>{this.state.parkingObj.parkingName}</div>
                          <div className='content_table'>
                              <div className='header'>
                                  <div>Parking Id</div>
                                  <div>Charges for 2 Wheeler(per hour)</div>
                                  <div>Charges for 4 Wheeler(per hour)</div>
                                  <div>Address</div>
                                  <div>Longitude</div>
                                  <div>Lattitude</div>
                                  <div>Pincode</div>
                                  <div>Area(in sq.ft)</div>
                                  <div>Total 2 wheeler slots</div>
                                  <div>Total 4 wheeler slots</div>
                                  <div>Available 2 wheeler slots</div>
                                  <div>Available 4 wheeler slots</div>
                              </div>
                              <div className='data'>
                                  <div>{this.state.parkingObj.parkingId}</div>
                                  <div>Rs.{this.state.parkingObj.priceTwoWheeler}</div>
                                  <div>Rs.{this.state.parkingObj.priceFourWheeler}</div>
                                  <div>{this.state.parkingObj.parkingAddress}</div>
                                  <div>{this.state.parkingObj.parkingAddrLongitude}</div>
                                  <div>{this.state.parkingObj.parkingAddrLatitude}</div>
                                  <div>{this.state.parkingObj.pincode}</div>
                                  <div>{this.state.parkingObj.parkingArea}</div>
                                  <div>{this.state.parkingObj.totalSlotTwoWheeler}</div>
                                  <div>{this.state.parkingObj.totalSlotFourWheeler}</div>
                                  <div>{this.state.parkingObj.slotAvailableTwoWheeler}</div>
                                  <div>{this.state.parkingObj.slotAvailableFourWheeler}</div>                       
                              </div>
                          </div>
                      </div>
                      <button className='btn btn-secondary' onClick={this.closeModal}>Close</button>
                    </div>
                </div>
              )
        }else if (this.state.user && this.state.user.userRole === 'Customer'){
            return (
                <div>
                      <h2 className='text-center'>List of Parking spaces</h2>
                  
                    <div className='row'>
                      <table className='table table-stripped table-bordered'>
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Address</th>
                              <th>Available (2 Wheeler)</th>
                              <th>Available (4 Wheeler)</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                              this.state.parkings.map(
                                  parking=>
                                  <tr key={parking.parkingId}>
                                      <td>{parking.parkingName}</td>
                                      <td>{parking.parkingAddress}</td>
                                      <td>{parking.slotAvailableTwoWheeler}</td>
                                      <td>{parking.slotAvailableFourWheeler}</td>
                                      <td>
                                          <button style={{marginLeft:"10px"}} onClick={ () =>this.viewParking(parking.parkingId)} className="btn btn-info">View</button>
                                          <button style={{marginLeft:"10px"}} onClick={ () =>this.goToBooking(parking.parkingId)} className="btn btn-info">Book</button>
                                      </td>                           
                                  </tr>
                              )
                          }
                      </tbody>
                      </table>
          
                    </div>
          
                    <div className='view_modal'>
                      <div className='content'>
                          <div className='title'>{this.state.parkingObj.parkingName}</div>
                          <div className='content_table'>
                              <div className='header'>
                                  <div>Parking Id</div>
                                  <div>Charges for 2 Wheeler(per hour)</div>
                                  <div>Charges for 4 Wheeler(per hour)</div>
                                  <div>Address</div>
                                  <div>Longitude</div>
                                  <div>Lattitude</div>
                                  <div>Pincode</div>
                                  <div>Area(in sq.ft)</div>
                                  <div>Total 2 wheeler slots</div>
                                  <div>Total 4 wheeler slots</div>
                                  <div>Available 2 wheeler slots</div>
                                  <div>Available 4 wheeler slots</div>
                              </div>
                              <div className='data'>
                                  <div>{this.state.parkingObj.parkingId}</div>
                                  <div>Rs.{this.state.parkingObj.priceTwoWheeler}</div>
                                  <div>Rs.{this.state.parkingObj.priceFourWheeler}</div>
                                  <div>{this.state.parkingObj.parkingAddress}</div>
                                  <div>{this.state.parkingObj.parkingAddrLongitude}</div>
                                  <div>{this.state.parkingObj.parkingAddrLatitude}</div>
                                  <div>{this.state.parkingObj.pincode}</div>
                                  <div>{this.state.parkingObj.parkingArea}</div>
                                  <div>{this.state.parkingObj.totalSlotTwoWheeler}</div>
                                  <div>{this.state.parkingObj.totalSlotFourWheeler}</div>
                                  <div>{this.state.parkingObj.slotAvailableTwoWheeler}</div>
                                  <div>{this.state.parkingObj.slotAvailableFourWheeler}</div>                       
                              </div>
                          </div>
                      </div>
                      <button className='btn btn-secondary' onClick={this.closeModal}>Close</button>
                    </div>
                </div>
              )
        }
    
  }
}
