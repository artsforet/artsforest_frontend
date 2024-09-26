
<script>
export default {
  data() {
    return {
      userId: '', // 사용자 ID 입력을 위한 필드
      message: null,
      error: null,
    };
  },
  methods: {
    async confirmPayment() {
      try {
        const userId = localStorage.getItem('userId')
        // 사용자 ID를 서버에 보내서 결제 확인 요청
        const response = await this.$http.post('http://localhost:80/payment/confirm', {
          userId: userId
        });
        this.message = response.data;
      } catch (error) {
        this.error = 'An error occurred while confirming the payment.';
        if (error.response && error.response.status === 404) {
          this.error = 'User not found';
        } else if (error.response && error.response.status === 400) {
          this.error = error.response.data.message;
        }
      }
    }
  }
};
</script>


<template>
<div class="cart-bank-page-container">
<div class="cart-bank-page-wrapper">
  <h3> 
    계좌이체 페이지 
  </h3>

  <div class="cart-bank-page-send">
    <div class="cart-bank-page"> 
        <div class="cart-bank">
          입금전
          <div class="cart-bank-radius"></div>
          입금 확인
          <div class="cart-bank-radius"></div>
          이용권 등록 완료
          <div class="cart-bank-radius"></div>
        </div>
    </div>
  </div>


  <br /><br /><br />
  <div>
    <h4>계좌이체</h4>
    <p><strong> 국민 </strong> 000-000-00000000 &nbsp; 금액 100,000 원 </p>


    <form @submit.prevent="confirmPayment">
      <!-- <label for="userId">User ID:</label>
      <input type="text" v-model="userId" required> -->

      <button type="submit">Confirm Payment</button>
    </form>
    <div v-if="message">{{ message }}</div>
    <div v-if="error">{{ error }}</div>
  </div>






  <br /><br /><br />  <br /><br /><br />  <br /><br /><br />  <br /><br /><br />
    <h3> 구매하기 </h3>


    
    <div class="music-ticket">
    <div class="music-ticket-left">
      
      <br />

      <div>
        <h5 style="font-weight: 600"> [구독결제] 크리에이터 이용권 </h5>
      </div>
      
      <div>
        정기구독시 일반 이용권 대비 20% 저렴합니다.
      </div>
    </div>

    <div class="music-ticket-right">
      <div class="music-ticket-right-container">
        
        <div class="music-ticket-right-container-title"> 
          <h4> 결제 이용권 구매하기 </h4> 
        </div>
          
        <div class="price">
          <span style="border: 1px solid #FFC200; padding: 5px; border-radius: 10px; color: #FFC200"> 1개월 </span>
          <span class="origin-price">15000원</span>
          <span class="real-price">
            <h4 style="margin:0; padding: 0;">10000원</h4>
          </span>
          <button class="subscribe" @click="subscribe"> 구독하기 </button>
        </div>

          <!-- <button>결제하기</button> -->
        </div>
      </div>
     </div>



  <br /><br /><br />


  <div class="cart-bank-page-footer">
    <div> 은행 정보</div>
    <div> 국민은행 12-11111111</div>
    <div> 우리은행 12-11111111</div>
    <div> 기업은행 12-11111111</div>

  </div>
</div>
</div>
</template>

<style>
.cart-bank-page-container {
    width: 100%;
    height: 70vh;
    background-color: #202020;
    color: white;
}

.cart-bank-page-wrapper {
    width: 1200px;
    margin: 0 auto;
    color: white;
    padding-top: 100px;
}

.cart-bank {
    display: flex;
    align-items: center;
}


.cart-bank-page {
    display: flex;
}
.cart-bank-radius {
    width: 30px;
    height: 30px;
    border-radius: 25px;
    background-color: #FFC200;
    margin: 0 20px;
}


.cart-bank-page-footer {
    width: 100%;
    margin-top: 300px;
}
</style>