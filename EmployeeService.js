import axios from 'axios';

const Employee_Api_Url="http://localhost:9090/api/v1/employees";

class EmployeeService{

    getEmployees(){
        return axios.get(Employee_Api_Url);

    }
    createEmployee(employee){
        return axios.post(Employee_Api_Url,employee);
    }

    getEmployeeById(employeeId){
        return axios.get(Employee_Api_Url+'/'+ employeeId);
    }

    //http://localhost:9090/api/v1/employees/1
    updateEmployee(employee,employeeId){
        return axios.put(Employee_Api_Url+'/'+employeeId,employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(Employee_Api_Url+'/'+employeeId);
    }

}

export default new EmployeeService()
