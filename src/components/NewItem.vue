<script setup lang="ts">
import { type ListItem, itemTypes, useListItemStore } from '@/stores/list-item'
import { useMessage, type FormInst } from 'naive-ui'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const message = useMessage()
const route = useRoute()
const isOpen = ref(false)
const formRef = ref<FormInst | null>(null)

type ItemForm = { title: string, rating: number, type: typeof itemTypes[number]['value'], url: string }

const formValue = ref<ItemForm>({
  title: '',
  rating: 1,
  type: itemTypes[0]['value'],
  url: '',
})
const tags = ref<string[]>([])

const listItems = useListItemStore()

const clearData = () => {
  formValue.value = {
    title: '',
    rating: 1,
    type: itemTypes[0]['value'],
    url: '',
  }
}

const toggleModal = () => {
  clearData()
  isOpen.value = !isOpen.value
}

const createItem = async () => {
  try {
    const item: ListItem = {
      title: formValue.value.title,
      type: formValue.value.type,
      rating: formValue.value.rating,
      tags: tags.value,
    }
    listItems.addItemToList(route.params.id as string, item)
  } catch (err) {
    console.error(err)
  }
  toggleModal()
}
</script>

<template>
  <n-button @click="toggleModal" quaternary type="primary">New Item</n-button>
  <n-modal v-model:show="isOpen" preset="dialog" title="New item">
    <n-form ref="formRef" :model="formValue">
      <n-form-item label="Item name *" path="title">
        <n-input required v-model:value="formValue.title" type="text" placeholder="Title" />
      </n-form-item>
      <n-form-item label="Item type *" path="type">
        <n-select v-model:value="formValue.type" :options="itemTypes" />
      </n-form-item>
      <n-form-item label="Rate item" path="rating">
        <n-rate v-model:value="formValue.rating" allow-half />
      </n-form-item>
      <n-form-item label="Item tags (click + to add)" path="tags">
        <n-dynamic-tags v-model:value="tags" />
      </n-form-item>
      <n-form-item label="URL" path="title">
        <n-input v-model:value="formValue.url" type="url" placeholder="https://..." />
      </n-form-item>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
            <n-button round type="secondary" @click="toggleModal">Cancel</n-button>
            <n-button round type="primary" @click="createItem">Create</n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </n-modal>
</template>

