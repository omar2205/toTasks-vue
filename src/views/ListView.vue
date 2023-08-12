<script setup lang="ts">
import { useListStore } from '@/stores/list';
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import NewItemVue from '@/components/NewItem.vue'

const list = ref()

const route = useRoute()
const lists = useListStore()
lists.getListById(route.params.id as string, true).then(l => list.value = l)
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
    {{ JSON.stringify(list, null, 2) }}
  </div>
</template>
