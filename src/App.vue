<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useOsTheme, darkTheme } from 'naive-ui'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import LoadingFullScreen from '@/components/LoadingFullScreen.vue'

const osThemeRef = useOsTheme()
const theme = computed(() => osThemeRef.value === 'dark' ? darkTheme : null)

const auth = useAuthStore()
auth.getUser()
</script>

<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <n-notification-provider>
      <n-message-provider>
        <header>
          <div class="wrapper">
            <nav>
              <RouterLink to="/">Home</RouterLink>
              <RouterLink to="/me" v-if="auth.user">Me</RouterLink>
              <RouterLink to="/login" v-if="!auth.user">Login</RouterLink>
              <RouterLink to="/register" v-if="!auth.user">Register</RouterLink>
              <n-button @click="auth.logout" v-if="auth.user">Logout</n-button>
            </nav>
          </div>
        </header>
        <RouterView />
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<style scoped>
.wrapper nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.wrapper nav a {
  color: var(--n-text-color);
  text-decoration: none;
}
.wrapper nav a:hover {
  color: var(--n-text-color-hover);
}
</style>
