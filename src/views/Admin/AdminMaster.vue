<template>
  <div class="admin-master-all">
    <div class="admin-master">
      <div class="admin-nav">
        <h2> ADMIN </h2>
        <ul>
          <li><router-link to="/master/curation"> 큐레이션 등록 </router-link></li>
          <li><router-link to="/master/curation/delete"> 큐레이션 삭제 </router-link></li>
          <li><router-link to="/master/pdadmin"> PD의 선택 </router-link></li>
        </ul>
      </div>
      <div class="router-container">
        <div class="router-container-wrap">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-master {
  display: flex;
  color: white;
}

.admin-nav {
  min-width: 400px;
  background-color: #212121;
  padding-top: 50px;
  padding-left: 50px;
}

.admin-nav  > ul > li {
  list-style: none;
}

.admin-nav  > ul > li > a {
  color: white;
  text-decoration: none;
  line-height: 40px;
}

.admin-nav  > ul > li > a:hover {
  color: rgba(255,255,255, 0.6)
}


.router-container {
  width: 100%;
  padding: auto;
  margin: 0 auto;
  background-color: #212121;
}

.router-container-wrap {
  width: 1920px;
  margin: 0 auto;
}


</style>
