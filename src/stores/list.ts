import { ref } from 'vue'
import { defineStore } from 'pinia'

import { auth, db } from '@/firebaseConfig'
import {
  addDoc,
  doc,
  collection,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'

interface ListItem {
  id?: string
  title: string
  type: 'movie' | 'tv-show'
  rating?: number
  tags?: string[]
}

interface List {
  id?: string
  name: string
  description?: string
  items?: ListItem[]
  userId?: string
  tags?: string[]
}

const lists_collection = collection(db, 'lists')

export const useListStore = defineStore('lists', () => {
  const lists = ref<List[]>([])

  async function getUserLists() {
    await auth.authStateReady()
    const user = auth.currentUser
    if (user) {
      const q = query(lists_collection, where('userId', '==', user.uid))
      const querySnapshot = await getDocs(q)
      lists.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as List),
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

  async function removeList(listid: string) {
    const user = auth.currentUser
    if (user) {
      const docRef = await getListById(listid)
      if (docRef && docRef.get('userId') === user.uid)
        await deleteDoc(docRef.ref)
    }
  }

  async function getListById(listid: string) {
    if (!listid) return null
    const docRef = await getDoc(doc(db, 'list', listid))
    return docRef
  }

  return {
    lists,
    getUserLists,
    createList,
    removeList,
    getListById,
  }
})
