import axios from 'axios';


const parking_base_url="http://localhost:9090/parking/v2";

class ParkingService{
    getParking(){
        return axios.get(parking_base_url+"/allparkings");
    }

    deleteParking(id){
        return axios.get(parking_base_url+"/deleteParking/"+id);
    }
    
    getParkingById(id){
        return axios.get(parking_base_url+"/findParkingById/"+id);
    }

    getParkingByUser(user){
        return axios.post(parking_base_url+"/getParkingsByUser/",user);
    }

    UpdateParking(parking){
        return axios.post(parking_base_url+"/updateParking",parking);
    }

    addNewParking(parking){
        return axios.post(parking_base_url+"/addNewParking",parking);
    }
}

export default new ParkingService()