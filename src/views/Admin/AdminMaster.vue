<template>
  <div id="admin">
    <div class="layout">
      <ul class="admin-nav">
        <li> 
          <router-link to="/">
          <h3> Admin </h3>
          </router-link>
        </li>
        <li> <router-link to="/">Home</router-link></li>
        <li> <router-link to="/about">About</router-link></li>
        <li> <router-link to="/dashboard">Dashboard</router-link></li>
        <li> <router-link to="/dashboard/settings">Settings</router-link></li>
      </ul>
      <main class="content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style scoped>
 
.main-content {
  width: 100%;
  background-color: black;
 }
#admin {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 60px;
  padding-top: 100px;
  background-color: black;
  color: white;
}

.layout {
  max-width: 100%;
  display: flex;
  height: 100vh;
}

.admin-nav {
  width: 250px;
  padding: 20px;
  color: black;
  text-align: start;
  top: 0;
}

.admin-nav > a {
  color: #fff;
}
.admin-nav > li > a {
  color: white;
  text-decoration: none;
  line-height: 60px;
}
.content {
  flex: 1;
  padding: 20px;
  top: 0;
  padding-top: 50px;
}
</style>
