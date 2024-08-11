<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header"></slot>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSongStore } from '@/stores/songStore';
import { onMounted } from 'vue';

const songStore = useSongStore();
function close() {
  this.$emit('close');
}

// onMounted(async () => {
//   await songStore.userPlaylist();
// });
</script>

<style>
.modal-mask {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  background-color: black;
  display: flex;
  justify-content: center;
  z-index: 999999999;;
}

.modal-wrapper {
  display: flex;
}

.modal-container {
  width: 500px;
  height:80%;
  background: black;
  border-radius: 5px;
  padding: 20px;
  /* text-align: center; */
  text-align: start;
}

.modal-header,
.modal-body,
.modal-footer {
  margin-bottom: 20px;
}

.modal-header {
  font-weight: bold;
}

.modal-footer {
  text-align: right;
}
</style>
