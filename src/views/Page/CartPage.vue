<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const subscribe = () => {
  router.push('/cart/bank')
}

</script>


<template>
<div class='cart-page-container'>
  <div class="cart-page-wrapper">
 <h2 style="color: white; font-weight: 550;"> 음악 이용권 구매 </h2>
 <br />
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
  </div>
</div>
</template>


<style>

.cart-page-container {
  width: 100%;
  height: 100vh;
  background-color: #202020;
}

.cart-page-wrapper {
  width: 1200px;
  height: 50vh;
  margin: 0 auto;
  padding-top:100px;
}

.music-ticket {
  width: 960px;
  height: 150px;
  border-radius: 25px;
  display: flex;
  background-color: #484848;
  align-items: center;
}

.music-ticket-left {
  width: 40%;
  height: 150px;
  padding-top: 20px;
  padding-left: 50px;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  background-color: #585858;
  color: white;
}

.music-ticket-right {
  color: white;
  text-align: center;
  margin: 0 auto;
}

.music-ticket-right-container {
  display: flex;
  flex-wrap: wrap;
}

.origin-price {
  text-decoration: line-through;
}


.music-ticket-right-container-title {
  width: 100%;
  text-align: center;
  margin: 0 auto;
}

.music-ticket-right-container-title > h4 {
  font-weight: 550;
}

.price {
  display: flex; /* 요소들을 가로로 배치하기 위해 플렉스박스 사용 */
  align-items: center; /* 수평 중앙 정렬 */
  justify-content: center; /* 수직 중앙 정렬 */
  text-align: center; /* 텍스트 중앙 정렬 */
  margin: 0 auto;
}

.origin-price, .real-price {
  margin: 10px 5px; /* 요소들 간의 간격 설정 */
}

.subscribe {
  width: 120px;
  background-color: #FFC200;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: 600;
}
</style>
