<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { refDebounced, watchDebounced } from '@vueuse/core'
import { BaseInput, Image, SkeletonShimmer, Modal } from '@/components/ui'
import { useDataStore } from '../stores/data'
import { storeToRefs } from 'pinia'
import gsap from 'gsap'

const { isFetching, data, isLoading, selectedPhoto } = storeToRefs(useDataStore())
const { setQueryKey } = useDataStore()

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const query = ref('')
const debouncedQuery = refDebounced(query, 500)

watchDebounced(
  debouncedQuery,
  (newQuery) => {
    if (newQuery) {
      setQueryKey(newQuery)
    } else {
      setQueryKey('african')
    }
  },
  { debounce: 800, maxWait: 1000 }
)

const animatePhotoItems = async () => {
  await nextTick(() => {
    gsap.fromTo(
      '.photo-item',
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        clearProps: 'all'
      }
    )
  })
}

watchDebounced(
  data,
  () => {
    if (data.value && data.value.length > 0) {
      animatePhotoItems()
    }
  },
  { debounce: 100 }
)

onMounted(() => {
  if (data.value && data.value.length > 0) {
    animatePhotoItems()
  }
})
</script>

<template>
  <main>
    <div class="hero-banner">
      <div class="search-container">
        <h1 v-if="isFetching && debouncedQuery !== ''">
          Searching for <span>"{{ debouncedQuery }}"</span>
        </h1>
        <h1 v-else-if="debouncedQuery !== '' && data && data.length > 0">
          Search Results for <span>"{{ debouncedQuery }}"</span>
        </h1>
        <BaseInput v-else-if="!isFetching && debouncedQuery === ''" v-model="query" />

        <p
          v-if="!isFetching && debouncedQuery !== '' && (!data || data.length > 0)"
          @click="query = ''"
          class="clear"
        >
          clear search
        </p>

        <div
          class="center-items"
          v-if="!isFetching && debouncedQuery !== '' && (!data || data.length === 0)"
        >
          <h1>
            No results found for <span>"{{ debouncedQuery }}"</span>
          </h1>
          <p class="clear" @click="setQueryKey('african'), (query = '')">clear search</p>
        </div>
      </div>
    </div>
    <div class="centered-container">
      <div :style="{ width: isLoading ? '100%' : 'auto' }" class="photo-grid">
        <template v-if="isLoading">
          <div v-for="i in 8" :key="i" class="photo-item">
            <SkeletonShimmer />
          </div>
        </template>
        <template v-else-if="data && data.length > 0">
          <div
            v-for="(photo, index) in data"
            @click="openModal(), (selectedPhoto = photo)"
            :key="index"
            class="photo-item"
          >
            <Image :photo="photo" />
            <div class="image-info">
              <p>{{ photo?.user?.first_name }}</p>
              <span>{{ photo?.user?.location }}</span>
            </div>
            <div class="overlay"></div>
          </div>
        </template>
      </div>
    </div>
  </main>
  <Modal :isOpen="isModalOpen" @close="closeModal">
    <div class="modal-content">
      <img :src="selectedPhoto?.urls?.regular" alt="Selected Photo" />
      <div class="modal-image-info">
        <p>{{ selectedPhoto?.user?.first_name }}</p>
        <span>{{ selectedPhoto?.user?.location }}</span>
      </div>
    </div>
  </Modal>
</template>
