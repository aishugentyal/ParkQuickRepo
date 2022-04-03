
import './App.css';
import ListEmployeeComponent from './Components/ListEmployeeComponent';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import CreateEmployee from './Components/CreateEmployee';
// import UpdateEmployee from './Components/UpdateEmployee';
import ViewEmployee from './Components/ViewEmployee';
import LoginComponent from './Components/LoginComponent';
import HomeComponent from './Components/HomeComponent';
import AddParking from './Components/AddParking';
import RegisterComponent from './Components/RegisterComponent';
import ParkingListComponent from './Components/ParkingListComponent';
import BookParking from './Components/BookParking';
import MyBookings from './Components/MyBookings';
import ModifyBooking from './Components/ModifyBooking';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";



function App() {
  return (
    <div>
      <Router>
   
        <Header/>
          <div className="container">
            <Switch>
              <Route path='/' exact component= {HomeComponent}></Route>
              {/* <Route path='/employees' component ={ListEmployeeComponent}></Route> */}
              {/* //step1 */}
              <Route path='/register-user' component={RegisterComponent}></Route>
              {/* <Route path='/add-employee/:id' exact component ={CreateEmployee}></Route> */}
              {/* <Route path='/view-employee/:id' exact component ={ViewEmployee}></Route> */}
              <Route path='/login' exact component={LoginComponent}></Route>
              <Route path='/add-parking/:id' exact component={AddParking}></Route>
              {/* <Route path='/update-employee/:id' exact component ={UpdateEmployee}></Route> */}
              <Route path='/parking-list' component={ParkingListComponent}></Route>
              <Route path='/book-parking/:id' component={BookParking}></Route>
              <Route path='/bookings' component={MyBookings}></Route>
              <Route path='/modifyBooking/:id' component={ModifyBooking}></Route>
            </Switch>
          </div>
        {/* <Footer/> */}
      
      </Router>
    </div>
  );
}

export default App;
