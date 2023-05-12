import http from 'plugins/axios';
class ApiEnquiry {
  getApiConsole() {
    const data = http.get('/api/thirdparty/getthirdpartyOrganization?page=1&numPerPage=10');
    return data;
  }
}

export const Enquiry = new ApiEnquiry();
