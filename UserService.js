import axios from 'axios';

const User_Url="http://localhost:9090/user/v1";

class UserService{

    addUser(user){
        return axios.post(User_Url+"/register",user);
    }

    loginUser(user){
        return axios.post(User_Url+"/loginUser",user);
    }

}


export default new UserService()