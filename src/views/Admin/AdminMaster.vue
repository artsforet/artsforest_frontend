<template>
  <div id="admin">
    <div class="layout">
      <ul class="admin-nav">
        <li> 
          <router-link to="/">
          <h3> Admin </h3>
          </router-link>
        </li>
        <li class="admin-list"> <router-link to="/master/curation">큐레이션 등록</router-link></li>
        <li class="admin-list" > <router-link to="/master/curation/delete">큐레이션 삭제</router-link></li>
        <li class="admin-list"> <router-link to="/master/pdadmin">PD의 선택</router-link></li>
        <li class="admin-list"> <router-link to="/master/lastsong">방금 그곡</router-link></li>
        <li class="admin-list"> <router-link to="/master/lastsong/delete"> 방금 그곡 제거</router-link></li>
      </ul>
      <div style="width: 0.5px; height: 90%; border:0.5px solid rgba(255,255,255, 0.1 )"></div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-content {
  background-color: black;
}

#admin {
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 60px;
  padding-top: 100px;
  background-color: #212121;
  color: white;
}

.layout {
  display: flex;
  height: 70vh;
}

.admin-nav {
  width: 250px;
  padding: 20px;
  color: black;
  text-align: start;
  top: 0;
}

.admin-nav > li {
  min-width: 200px;
}

.admin-nav > li > a {
  min-width: 200px;
  color: white;
  text-decoration: none;
  line-height: 60px;
}

.admin-list {
  min-width: 200px;
}

.content {
  flex-grow: 1;
  padding-bottom: 200px;
  height: 50vh;
}
</style>