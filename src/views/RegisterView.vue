<script setup lang="ts">
import { type FormInst, useMessage } from 'naive-ui'
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth'
import router from '@/router';

const formRef = ref<FormInst | null>(null)
const message = useMessage()
const auth = useAuthStore()

const formValue = ref({
  user: {
    displayName: '',
    email: '',
    password: '',
  }
})

const registerUser = async () => {
  try {
    await auth.registerWithEmail(formValue.value.user)
    router.push('/me')
  } catch (err) {
    console.log(err)
    if ((err as Error).message.includes('email-already-in-use'))
      message.error('This email is already in use. Try login in')
    else message.error('Error Registering. Try again later.')
  }
}

</script>

<template>
  <div>
    <h1>Register</h1>

    <n-form ref="formRef" :model="formValue">
      <n-form-item label="Display name" path="user.displayName">
        <n-input v-model:value="formValue.user.displayName" type="text" placeholder="Name" />
      </n-form-item>
      <n-form-item label="Email" path="user.email">
        <n-input v-model:value="formValue.user.email" type="text" placeholder="Email" />
      </n-form-item>
      <n-form-item label="Password" path="user.password">
        <n-input v-model:value="formValue.user.password" type="password" placeholder="Password" />
      </n-form-item>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
            <n-button round type="secondary" @click="() => router.push('/login')">Login</n-button>
            <n-button round type="primary" @click="registerUser">Register</n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </div>
</template>

<style scoped>
div {
  max-width: 500px;
  margin: 0 auto;
}

h1 {
  font-size: 1.5rem;
  text-align: center;
}
</style>
