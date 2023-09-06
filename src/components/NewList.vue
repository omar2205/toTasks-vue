<script setup lang="ts">
import { useListStore } from '@/stores/list';
import type { FormInst } from 'naive-ui';
import { ref } from 'vue';

const isOpen = ref(false)
const formRef = ref<FormInst | null>(null)
const formValue = ref({
  title: '',
  description: '',
})
const tags = ref<string[]>([])

const list = useListStore()

const toggleModal = () => isOpen.value = !isOpen.value

const createList = async () => {
  toggleModal()
  try {
    await list.createList({
      name: formValue.value.title,
      description: formValue.value.description,
      tags: tags.value,
    })
    await list.getUserLists()
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <n-button class="new-list-btn" @click="toggleModal">New list</n-button>
  <n-modal v-model:show="isOpen" preset="dialog" title="New list">
    <n-form ref="formRef" :model="formValue">
      <n-form-item label="List title" path="title">
        <n-input required v-model:value="formValue.title" type="text" placeholder="Title" />
      </n-form-item>
      <n-form-item label="List description" path="description">
        <n-input v-model:value="formValue.description" type="text" placeholder="Description" />
      </n-form-item>
      <n-form-item label="List tags (click + to add)" path="tags">
        <n-dynamic-tags v-model:value="tags" />
      </n-form-item>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
            <n-button round type="secondary">Cancel</n-button>
            <n-button round type="primary" @click="createList">Create</n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </n-modal>
</template>

<style>
.new-list-btn {
  margin-bottom: 1rem;
}
</style>
