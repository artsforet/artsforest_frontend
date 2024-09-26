// src/stores/paymentStore.js

import { defineStore } from 'pinia';
import axios from 'axios';

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    cart: [],
    purchases: [],
    songs: []
  }),
  getters: {
    totalAmount(state) {
      return state.cart.reduce((total, item) => total + item.price, 0);
    }
  },
  actions: {
    async fetchSongs() {
      try {
        const response = await axios.get('/api/payment/songs');
        this.songs = response.data;
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    },
    addToCart(song) {
      this.cart.push(song);
    },
    clearCart() {
      this.cart = [];
    },
    async confirmPayment(paymentDetails: any) {
      try {
        const response = await axios.post('/api/payment/confirm-payment', paymentDetails);
        this.purchases.push(paymentDetails);
        this.clearCart();
        return response.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Payment failed');
      }
    }
  }
});
