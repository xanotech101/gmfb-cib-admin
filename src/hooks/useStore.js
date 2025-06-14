import { create } from 'zustand';

export const useStore = create(() => ({
  user: null,
  notifications: [],
  account: null,
  currentOrganization: null
}));
