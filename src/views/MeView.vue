<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useListStore } from '@/stores/list'
import NewList from '@/components/NewList.vue'

const auth = useAuthStore()
auth.getUser()

const list = useListStore()
list.getUserLists()
</script>

<template>
  <div class="wrapper">
    <h1>Welcome {{ auth.user?.email }}</h1>
    <NewList />
    <n-list hoverable clickable v-for="l in list.lists">
      <n-list-item>
        <n-thing :title="l.name" content-style="margin-top: 10px;">
          <template #description>
            <n-space size="small" style="margin-top: 4px" v-if="l.tags" v-for="tag in l.tags">
              <n-tag :bordered="false" type="info" size="small">{{ tag }}</n-tag>
            </n-space>
          </template>
          <template v-if="l.description">
            {{ l.description }}
          </template>
        </n-thing>
      </n-list-item>
    </n-list>
  </div>
</template>

<style>
.wrapper {
  max-width: 26rem;
  margin: 0 auto;
}
</style>
