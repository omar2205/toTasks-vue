<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { ref } from 'vue'
// @ts-ignore
import { debounce } from '@/utils/debounce'
import { getImdbSmallImage } from '@/utils/getImdbSmallImage'

const emit = defineEmits(['select'])

type ImdbResult = {
  i: {
    height: number,
    width: number,
    imageUrl: string
  },
  id: string,
  l: string,
  q: string,
  qid: string,
  rank: number,
  s: string,
  y: number,
}

const message = useMessage()
const state = ref<'loading' | 'error' | 'idle'>('idle')
const isOpen = ref(false)
const modalLoadingBarRef = ref()
const search = ref('')
const result = ref<ImdbResult[]>([])

const IMDB_URL = 'https://imdb-search-omar2205.deno.dev/?q='

const toggleModal = () => {
  isOpen.value = !isOpen.value
}

const addItem = (item: ImdbResult) => {
  emit('select', item)
  message.info('Added item details')
  toggleModal()
}

const onInput = debounce(async (e: any) => {
  state.value = 'loading'
  await fetch(`${IMDB_URL}${e}`)
    .then(res => res.json())
    .then(data => result.value = data)
    .catch(err => message.error('Error fetching from IMDB'))
  state.value = 'idle'
}, 500)

</script>

<template>
  <n-button @click="toggleModal" quaternary type="primary">Load from IMDB</n-button>
  <n-modal ref="modalLoadingBarRef" v-model:show="isOpen" preset="dialog" title="Search IMDB">
    <n-input @input="onInput" v-model:value="search" type="text" placeholder="https://..." />
    <div class="content" :class="{ loading: (state === 'loading') }">
      <n-space v-if="state === 'loading'">
        <n-spin size="small" />
      </n-space>
      <n-space v-else>
        <n-list hoverable clickable>
          <n-list-item v-for="r in result" @click="addItem(r)">
            <img v-if="r.i" :src="getImdbSmallImage(r.i.imageUrl)" />
            {{ r?.l }} {{ r.qid ? '(' + r.qid + ')' : '' }} - {{ r?.y }}
          </n-list-item>
        </n-list>
      </n-space>
    </div>
    <n-row :gutter="[0, 24]">
      <n-col :span="24">
        <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
          <n-button round type="secondary" @click="toggleModal">Cancel</n-button>
        </div>
      </n-col>
    </n-row>
  </n-modal>
</template>

<style scoped>
.content {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 2.5rem;
  margin-bottom: 1rem;
}

.content.loading {
  align-items: center;
}
</style>
