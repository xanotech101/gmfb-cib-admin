import http from 'plugins/axios';
import { notification } from 'utils';

const DEFAULT_MESSAGE = 'Something went wrong, please try again';

class TicketService {
  async create(payload) {
    try {
      const response = await http.post('/api/ticket/create', payload);
      notification(response?.message ?? 'Ticket created successfully', 'success');
      return response.data;
    } catch (error) {
      notification(error.response.data.message ?? DEFAULT_MESSAGE, 'error');
      throw new Error(error);
    }
  }
  async getTickets(params) {
    try {
      const response = await http.get('/api/ticket/all', {
        params
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getTicket(id) {
    try {
      const response = await http.get(`/api/ticket/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async replyToTicket(id, payload) {
    try {
      const response = await http.post(`/api/ticket/reply/${id}`, payload);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const ticketService = new TicketService();
