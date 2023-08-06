<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
auth.getUser()
</script>

<template>
  <h1>Welcome {{ auth.user!.email }}</h1>
</template>
