<template>
  <div class="loading">
    <n-spin size="small" />
  </div>
</template>

<style>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  z-index: -1;
}
</style>
