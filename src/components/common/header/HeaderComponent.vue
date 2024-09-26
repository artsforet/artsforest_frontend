<template>
  <div class="header-bottom_mask">
    <div class="header-bottom_content">
      <div class="header-inner_container header-inner_container--bottom">
        <div class="header-interact">
          <router-link to="/" class="header-logo"> ART FOREST </router-link>
          <form class="header_search-area">
            <!--            <input type="hidden" name="searchtype" value="track" />-->
            <div class="header_search-wrap">
              <input
                  class="header_search-input"
                  id="search-keyword"
                  type="search"
                  maxlength="50"
                  name="searchtext"
                  placeholder="검색어를 입력해주세요!"
                  value=""
              />
              <!--              <input-->
              <!--                class="header_search-button header_search-button&#45;&#45;submit"-->
              <!--                type="submit"-->
              <!--              />-->
              <input
                  class="header_search-button header_search-button--reset"
                  type="reset"
                  value="취소"
              />
            </div>
          </form>
        </div>
        <div class="header-shortcut_area">
          <div class="header-shortcut">
            <div class="shortcut-header">
              <a class="shortcut-link" href="/soundfactory/song">사운드 팩토리</a>
            </div>
            <div class="shortcut-item_list">
              <div class="shortcut-item">
                <router-link to="/soundfactory/song" class="shortcut-link">곡</router-link>
              </div>
              <div class="shortcut-item">
                <router-link to="/soundfactory/album" class="shortcut-link">앨범</router-link>
              </div>
            </div>
          </div>
          <div class="header-shortcut">
            <div class="shortcut-header">
              <a class="shortcut-link" href="#">SFX</a>
            </div>
            <div class="shortcut-item_list">
              <div class="shortcut-item">
                <router-link to="/sfx/sfxEffect" class="shortcut-link">효과음</router-link>
              </div>
              <div class="shortcut-item">
                <router-link to="/sfx/sfxPolysound" class="shortcut-link">폴리사운드</router-link>
              </div>
            </div>
          </div>
          <div class="header-shortcut">
            <div class="shortcut-header">
              <a class="shortcut-link" href="#">예술숲</a>
            </div>
            <div class="shortcut-item_list">
              <div class="shortcut-item">
                <router-link to="/artsforest/song" class="shortcut-link"> 곡 </router-link>
              </div>
              <div class="shortcut-item">
                <router-link to="/artsforest/album" class="shortcut-link"> 앨범 </router-link>
              </div>
            </div>
          </div>
          <div class="header-shortcut">
            <div class="shortcut-header">
              <a class="shortcut-link" href="#">무료배포</a>
            </div>
            <div class="shortcut-item_list">
              <div class="shortcut-item">
                <router-link to="/freefactory" class="shortcut-link"> 사운드팩토리 </router-link>
              </div>
              <div class="shortcut-item">
                <router-link to="/freeyard" class="shortcut-link"> 공유마당 </router-link>
            </div>
              </div>
          </div>

          <div class="header-shortcut">
            <div class="shortcut-header">
              <div class="shortcut-link">플레이리스트</div>
            </div>
            <div class="shortcut-item_list">
              <div class="shortcut-item">
                <router-link to="/playlist/curation" class="shortcut-link"> 큐레이션 </router-link>
              </div>
              <div class="shortcut-item">
                <router-link to="/playlist/lastsong" class="shortcut-link"> 방금그곡 </router-link>
              </div>
            </div>
          </div>
          <!-- <div class="shortcut-header_bottom_border"></div> -->
        </div>
        <!-- <div class="header-mobile_area">
          <div class="header-open_interaction" data-menu="search">
            <i class="header-search_toggle_icon"></i>
          </div>
          <div class="header-open_interaction" data-menu="menu">
            <i class="header-hamburger_menu_icon"></i>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<style scoped>
.header-ground_container {
  background-color: #202020;
  height: 200px;
  align-items: center;
  color: #ffffff;
  z-index: 20;
  margin: 0;
}

.header-inner_container {
  max-width: calc(100% - 40px);
  width: 1197px;
  margin: 0 auto;
  align-items: center;
}

.header-inner_container--top {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 30px;
  gap: 25px;
  font-size: 15px;
  user-select: none;
}

.header-inner_container--top > * {
  /* white-space: nowrap; */
}

.header-top_menu {
  padding-bottom: 2px;
}

.header-user_info {
  position: relative;
  display: flex;
  height: 100%;
}

.header-user_header {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.header-user_name {
  padding-bottom: 2px;
}

.header-locale-select,
.header-user_menu {
  position: absolute;
  width: 130px;
  padding: 8px 0;
  border-radius: 10px;
  z-index: 11;
  right: 0;
  top: 100%;
  margin-top: 10px;
  animation: header_menu_open 300ms cubic-bezier(0.95, 0.05, 0.95, 0.05) 1;
}


.header-locale-select--hidden {
  display: none;
}

.header-user_info:not(.header-user_info--open) .header-user_menu {
  display: none;
}

.user_menu-user_info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
}

.user_menu-user_info,
.user_menu-menu_item {
  padding: 8px 20px;
}

.user_menu-profile {
  width: 30px;
  height: 30px;
}

.user_menu-menu_item {
  font-size: 13px;
  color: #bbbbbb;
}

.user_menu-menu_link {
  background-color: transparent;
  cursor: pointer;
}


.header-bottom_mask {
  background-color: #000000;
  z-index: 1000;
  position: fixed;
  margin-top:20px;
  padding-bottom: 100px;
}

 
.header-bottom_content {
  position: absolute;
  width: 100%;
  min-height: 100px;
  background-color: rgba(0, 0, 0, 1);
  overflow: hidden;
  position: fixed;
  align-items: center;
}

.header-inner_container--bottom {
  display: grid;
  grid-template-areas:
    "interact shortcut"
    "blank shortcut";
  grid-template-columns: auto 51%;
  grid-template-rows: 100px auto;
  column-gap: 20px;
}

.header-interact {
  grid-area: interact;
  display: flex;
  align-items: center;
  gap: max(10%, 15px);
}

.header-logo {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  color: #FFC200;
  text-decoration: none;
  font-size: 1.7em;
  font-weight: 600;
}



.header-shortcut_area {
  grid-area: shortcut;
  display: flex;
  align-items: stretch;
  position: relative;
  /* white-space: nowrap; */
}

.header-shortcut {
  width: 20%;
  max-height: 100px;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  transition: max-height 250ms cubic-bezier(0.05, 0.95, 0.05, 0.95);
}


.header-shortcut_area:hover .header-shortcut:hover {
  max-height: 1000px;
  transition: max-height 250ms cubic-bezier(0.95, 0.05, 0.95, 0.05);
}

.shortcut-link {
  flex: 1;
  text-align: center;
  padding: 6px 0;
  transition: color 100ms;
  color: white;
  text-decoration: none;
}

.shortcut-link:hover {
  color: #f3be38;
}

.shortcut-header {
  position: relative;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
}

.shortcut-header::after,
.shortcut-header::before {
  content: "";
  position: absolute;
  display: block;
  height: 3px;
  width: 3px;
  bottom: 0;
  z-index: 1;
  
}

.shortcut-header::before {
  left: 0;
}

.shortcut-header::after {
  right: 0;
}

.shortcut-header_bottom_border {
  position: absolute;
  width: 20%;
  height: 0;
  top: 97px;
  right: 0;
  background-color: #f3be38;
  transition: right 150ms;
  pointer-events: none;
  animation: none;
}

.header-shortcut_area:hover .shortcut-header_bottom_border {
  height: 3px;
  animation: bottom_border_show 150ms;

}

@keyframes bottom_border_show {
  from {
    height: 0;
  }

  99.999% {
    height: 0;
  }

  to {
    height: 3px;
  }
}

.header-shortcut:nth-child(1):hover ~ .shortcut-header_bottom_border {
  right: 80%;
  opacity: 0.5;
}

.header-shortcut:nth-child(2):hover ~ .shortcut-header_bottom_border {
  right: 60%;
}

.header-shortcut:nth-child(3):hover ~ .shortcut-header_bottom_border {
  right: 40%;
}

.header-shortcut:nth-child(4):hover ~ .shortcut-header_bottom_border {
  right: 20%;
}

.shortcut-item_list {
  flex: 1;
  border-left: 0.5px solid rgba(245, 245, 245, 0.5);
  margin: 11px 0;
}


.header-shortcut:last-child .shortcut-item_list {
  border-right: 0.5px solid rgba(245, 245, 245, 0.5);

}

.shortcut-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
}

.header-arrow_icon {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 3px;
  width: 14px;
  height: 7px;
  --animation-duration: 300ms;
}

.header-arrow_icon::before {
  content: "";
  display: block;
  width: 9.9px;
  height: 9.9px;
  border: 2px solid #f3be38;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%) rotateZ(45deg);
  transition: transform var(--animation-duration);
  animation: none;
  border-radius: 2px;
}

.header-locale--open .header-arrow_icon::before,
.header-user_info--open .header-arrow_icon::before {
  transform: translate(-50%, 2px) rotateZ(45deg);
}

.header_search-input {
  width: 300px;
  background-color: transparent;
  height: 31px;
  font-size: 18px;
  padding-left: 5px;
  line-height: 14px;
  border-bottom: 1px solid white;
  border-left: none;
  border-right: none;
  border-top: none;
  color: white;
  position: relative;
}

.header_search-input:hover {
  background-color: rgba(255,255,255, 0.1);
}

.header_search-input:focus {
  color: rgba(255,255,255,0.8);
  outline: none;
}
 

.header_search-button {
  position: absolute;
  height: 31px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% auto;
  background-color: transparent;
  cursor: pointer;
}

.header_search-button--submit {
  left: 0;
  width: 18px;
  text-indent: -9999px;
}

.header_search-button--reset {
  right: 0;
  width: 14px;
  font-size: 14px;
  text-indent: -9999px;
}

.header_search-input:placeholder-shown ~ .header_search-button--reset {
  display: none;
}

.header-locale {
  position: relative;
  display: flex;
  align-items: flex-end;
  height: 100%;
}

.header-locale-icon--small {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.header-locale-icon--large {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.header-locale-current {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 5px;
  cursor: pointer;
}

.header-locale-text {
  color: #ffffff;
  padding-bottom: 2px;
}

.header-locale-text--small {
  font-size: 15px;
}

.header-locale-text--large {
  font-size: 17px;
}

.header-locale-item {
  display: grid;
  padding: 8px 20px;
  grid-template-columns: 24px auto;
  gap: 8px;
  align-items: center;
  cursor: pointer;
}

.header-locale-item:hover {
  background-color: #484848;
}

.beta-icon {
  padding: 2px 4px;
  margin-left: 6px;
  border-radius: 2px;
  border: 1px solid #f3be38;
  color: #f3be38;
  line-height: 1.1;
  font-size: 12px;
}

.beta-icon::before {
  content: "BETA";
}

.header-mobile_area {
  display: flex;
}

.header-open_interaction {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
}

.header-search_toggle_icon {
  display: block;
  width: 24px;
  height: 24px;
  position: relative;
}

.header-search_toggle_icon::before,
.header-search_toggle_icon::after {
  content: "";
  display: block;
}

.header-search_toggle_icon:not(.header-search_toggle_icon--active)::before {
  width: 300px;
  font-size: 18px;
  background-color: transparent;
  line-height: 14px;
  border-bottom: 1px solid #f9db54;
  border-left: none;
  border-right: none;
}

.header-search_toggle_icon:not(.header-search_toggle_icon--active)::after {
  position: absolute;
  width: 4px;
  height: 10px;
  background-color: #ffffff;
  right: 0;
  bottom: 2.5px;
  transform-origin: right bottom;
  transform: rotateZ(-45deg);
}

.header-search_toggle_icon--active::before,
.header-search_toggle_icon--active::after {
  position: absolute;
  width: 4px;
  height: 28px;
  top: 50%;
  left: 50%;
  background-color: #ffffff;
}

.header-search_toggle_icon--active::before {
  transform: translate(-50%, -50%) rotateZ(-45deg);
}

.header-search_toggle_icon--active::after {
  transform: translate(-50%, -50%) rotateZ(45deg);
}

.header-hamburger_menu_icon {
  --stroke: 3px;
  --color: #ffffff;
  display: flex;
  align-items: center;
  width: 22px;
  height: 21px;
  border-top: var(--stroke) solid var(--color);
  border-bottom: var(--stroke) solid var(--color);
}

.header-hamburger_menu_icon::before {
  content: "";
  display: block;
  width: 100%;
  height: var(--stroke);
  background-color: var(--color);
}

.header-update_wrap {
  position: relative;
  overflow: hidden;
  flex-grow: 1;
  height: 20px;
}

.header-update_inner {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: fit-content;
  display: flex;
  flex-direction: column;
  will-change: bottom, flex-direction;
  animation: 10000ms updateMove 4000ms linear infinite;
}

@keyframes updateMove {
  0% {
    bottom: 0;
    flex-direction: column;
  }

  10% {
    bottom: -100%;
    flex-direction: column;
  }

  10.00001% {
    bottom: 0;
    flex-direction: column-reverse;
  }

  50% {
    bottom: 0;
    flex-direction: column-reverse;
  }

  60% {
    bottom: -100%;
    flex-direction: column-reverse;
  }

  60.00001% {
    bottom: 0;
    flex-direction: column;
  }

  100% {
    bottom: 0;
    flex-direction: column;
  }
}

.header-update_area {
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  gap: 9px;
  color: #ffffff;
  font-size: 12px;
  min-width: 0;
}

.header-update_type {
  padding: 2px 6px 3px;
  border-radius: 3px;
  background-color: #f3be38;
}

.header-update_title {
  flex-grow: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  /* white-space: nowrap; */
}

.side_menu-container {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 0;
  transition: width 300ms;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  color: #ffffff;
  perspective: 2000px;
  perspective-origin: 0 200px;
}

.side_menu-container--visible {
  width: 100%;
}

 
.side_menu-container--visible .side_menu-wrap {
  transform: rotateY(0);
}
 


</style>