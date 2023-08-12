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
  updateDoc,
  type DocumentData,
} from 'firebase/firestore'
import { useListStore } from './list'

export const itemTypes = [
  { label: 'Movie', value: 'movie' },
  { label: 'TV-Show', value: 'tv-show' },
  { label: 'Other', value: 'other' },
] as const

export interface ListItem {
  id?: string
  title: string
  type: (typeof itemTypes)[number]['value']
  rating?: number
  tags?: string[]
}

const lists_collection = collection(db, 'lists')
const lists_doc = (listid: string) => doc(db, 'lists', listid)

export const useListItemStore = defineStore('list-items', () => {
  const listItems = ref<ListItem[]>([])
  const lists = useListStore()

  async function addItemToList(listId: string, item: ListItem) {
    await auth.authStateReady()
    const user = auth.currentUser
    if (user) {
      const listData = (await lists.getListById(listId, true)) as DocumentData
      if (!listData) throw new Error('NOT_LIST')
      if (user.uid !== listData.userId) throw new Error('NOT_LIST_OWNER')
      const items = listData.items || []
      await updateDoc(lists_doc(listId), {
        items: [...items, item],
      })
    }
  }

  return {
    listItems,
    addItemToList,
  }
})
