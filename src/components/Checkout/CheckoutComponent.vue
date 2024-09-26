<!-- src/components/Checkout.vue -->
<template>
  <div>
    <h2>Checkout</h2>
    <form @submit.prevent="handlePayment">
      <label>
        Amount:
        <input type="number" v-model="amount" :value="totalAmount" readonly />
      </label>
      <label>
        Reference Number:
        <input type="text" v-model="referenceNumber" required />
      </label>
      <button type="submit">Confirm Payment</button>
    </form>

    <p v-if="paymentStatus">{{ paymentStatus }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: 0,
      referenceNumber: '',
      paymentStatus: ''
    };
  },
  computed: {
    totalAmount() {
      return this.$store.state.cart.reduce((total, item) => total + item.price, 0);
    },
    selectedSong() {
      return this.$store.state.cart[0]; // 예시로 장바구니의 첫 곡을 사용
    }
  },
  methods: {
    handlePayment() {
      const paymentDetails = {
        songId: this.selectedSong.id,
        amount: this.totalAmount,
        referenceNumber: this.referenceNumber
      };

      this.$store.dispatch('confirmPayment', paymentDetails)
        .then(response => {
          this.paymentStatus = response.message;
          this.$router.push('/purchase-history');
        })
        .catch(error => {
          this.paymentStatus = error.message;
        });
    }
  }
};
</script>
