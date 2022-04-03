import axios from 'axios';

const booking_base_url="http://localhost:9090/booking/v3";

class BookingService {
    
    bookParking(obj){
        return axios.post(booking_base_url+"/bookParking/",obj);
    }

    getOwnerBookings(id){
        return axios.get(booking_base_url+"/getOwnerBookings/"+id);
    }

    getCustomerBookings(id){
        return axios.get(booking_base_url+"/getCustomerBookings/"+id);
    }

    getBookingById(id){
        return axios.get(booking_base_url+"/getbookingById/"+id);
    }

    cancelBookingById(id){
        return axios.get(booking_base_url+"/deletebookingById/"+id);
    }

    modifyBooking(obj){
        return axios.post(booking_base_url+"/modifyBooking/",obj);
    }
}

export default new BookingService()
