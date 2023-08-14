import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'

type NewUser = {
  email: string
  password: string
  displayName: string
}

export const open_routes = [
  `${import.meta.env.BASE_URL}login`,
  `${import.meta.env.BASE_URL}register`,
]

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const setUser = (newUser: User | null) => (user.value = newUser)

  async function registerWithEmail(user: NewUser) {
    const res = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password,
    )
    if (res) {
      await updateProfile(res.user, { displayName: user.displayName })
      // setUser(res.user)
      await getUser()
    } else throw new Error('Error creating user')
  }

  async function loginWithEmail(user: { email: string; password: string }) {
    const res = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password,
    )
    if (res) {
      setUser(res.user)
      window.location.href = `${import.meta.env.BASE_URL}me`
    }
    //else throw new Error('login failed')
  }

  async function logout() {
    await signOut(auth)
    setUser(null)
  }

  async function getUser() {
    onAuthStateChanged(auth, async (user) => {
      // if not logged in and we are not in open routes
      console.log(window.location.pathname)
      if (!user && !open_routes.includes(window.location.pathname)) {
        window.location.href = `${import.meta.env.BASE_URL}login`
      } else setUser(user)
    })
    return false
  }

  return {
    user,
    getUser,
    setUser,
    registerWithEmail,
    loginWithEmail,
    logout,
  }
})
