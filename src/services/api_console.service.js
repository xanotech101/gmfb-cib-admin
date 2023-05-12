import http from "plugins/axios";
class ApiEnquiry {
    getApiConsole() {
      
<<<<<<< HEAD
        const data  =  http.get('/api/thirdparty/getthirdpartyOrganization');
=======
        const data  =  http.get('/api/thirdparty/getthirdpartyOrganization?page=1&numPerPage=10');
>>>>>>> master
        return data;
    
    
  }
}
  
  export const Enquiry = new ApiEnquiry();