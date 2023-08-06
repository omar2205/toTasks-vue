<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useOsTheme, darkTheme } from 'naive-ui'
import { computed } from 'vue'

const osThemeRef = useOsTheme()
const theme = computed(() => osThemeRef.value === 'dark' ? darkTheme : null)
</script>

<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <n-notification-provider>
      <header>
        <div class="wrapper">
          <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
          </nav>
        </div>
      </header>

      <RouterView />
    </n-notification-provider>
  </n-config-provider>
</template>

<style scoped></style>
