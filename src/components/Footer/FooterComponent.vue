<template>
<div class="footer-container">
    <div class="footer-wrapper">
        <div class="footer-nav">
            <nav>
                <router-link to='/'>회사소개 </router-link>
                <router-link to='/'>FAQ </router-link>
                <router-link to='/'>이용약관 </router-link>
                <router-link to='/'>개인정보처리방침 </router-link>
            </nav>
        </div>
        <br />
        <div class='buisness-info'>
         <div class='buisness-info-item'>
            <div>주소.00000. 서울시 </div>
            <div>상호명.(주)예술숲 | 대표. | 사업자등록번호. | 통신판매업신고번호. </div>
            <div>E-mail.arts..... </div>
            <div>2024 ArtsForest.All rights reserved. </div>
        </div>
    </div>
    </div>
</div>
</template>

<style scoped>
.footer-container {
    width: 100%;
    background-color: #202020;
    text-align: start;
    padding-bottom: 200px;
    z-index: 99999999;
    color: white;
}

.footer-wrapper {
    width: 1194px;
    margin: 0 auto;
    align-items: center;
    padding-top: 70px;
}


.footer-nav > nav >  a {
    margin-right: 20px;
    text-decoration: none;
    color: white;
}



.buisness-info {
    font-size: 14px;
    color: #888;
}
</style>