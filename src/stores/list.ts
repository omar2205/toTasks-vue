import { ref } from 'vue'
import { defineStore } from 'pinia'

import { auth, db } from '@/firebaseConfig'
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'

interface ListItem {
  title: string
  type: 'movie' | 'tv-show'
  rating?: number
}

interface List {
  name: string
  items: ListItem[]
  userId?: string
}

const lists_collection = collection(db, 'lists')

export const useListStore = defineStore('lists', () => {
  const lists = ref<List[] | any>([])

  async function getUserLists() {
    await auth.authStateReady()
    const user = auth.currentUser
    if (user) {
      const q = query(lists_collection, where('userId', '==', user.uid))
      const querySnapshot = await getDocs(q)
      lists.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    }
  }

  async function createList(newList: List) {
    const user = auth.currentUser
    if (user) {
      const docRef = await addDoc(lists_collection, {
        ...newList,
        userId: user?.uid,
      })
      return docRef
    }
  }
  async function c() {
    const demoList: List = {
      name: 'Demo List',
      items: []
    }
    await createList(demoList)
  }

  return {
    lists,
    getUserLists,
    createList,
    c,
  }
})
