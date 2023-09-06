<script setup lang="ts">
import { PhStar } from '@phosphor-icons/vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import NewItemVue from '@/components/NewItem.vue'
import { useListStore } from '@/stores/list'
import type { DocumentData } from 'firebase/firestore'

const list = ref<DocumentData>([])

const route = useRoute()
const listStore = useListStore()
listStore.getListById(route.params.id as string, true)
  .then(l => list.value = l as DocumentData)
</script>

<template>
  <div class="wrapper">
    <h1>{{ list?.name || 'loading' }}</h1>
    <n-space size="small" v-if="list && 'tags' in list" v-for="tag in list.tags">
      <n-tag :bordered="false" type="info" size="small">{{ tag }}</n-tag>
    </n-space>
    <div>
      <NewItemVue />
      <n-button quaternary type="info">Edit list</n-button>
      <n-button quaternary type="error">Remove list</n-button>
    </div>
    <n-divider />
    <div class="cards">
      <n-card hoverable v-for="item in list.items || []" :title="item.title">
        <template #footer>
          <template v-if="item.rating">
            <ph-star weight="fill" />
            {{ item.rating }}
          </template>
        </template>
      </n-card>
    </div>
  </div>
</template>

<style>
.cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.n-card--hoverable {
  cursor: pointer;
}
</style>
