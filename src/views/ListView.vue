<script setup lang="ts">
import { useListStore } from '@/stores/list';
import { ref } from 'vue';
import { useRoute } from 'vue-router'

const list = ref()

const route = useRoute()
const lists = useListStore()
lists.getListById(route.params.id as string).then(l => list.value = l)
</script>

<template>
  <div>
    list# {{ $route.params.id }}
    {{ JSON.stringify(list, null, 2) }}
  </div>
</template>
