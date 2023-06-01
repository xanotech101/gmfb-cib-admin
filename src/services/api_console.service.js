import http from 'plugins/axios';
class ApiEnquiry {
  getApiConsole() {
    const data = http.get('/api/thirdparty/getthirdpartyOrganization');
    return data;
  }
}

export const Enquiry = new ApiEnquiry();
