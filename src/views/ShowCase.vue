<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { refDebounced, watchDebounced } from '@vueuse/core'
// import { gsap } from 'gsap'
import { BaseInput, Image, SkeletonShimmer, Modal } from '@/components/ui'
import { useDataStore } from '../stores/data'
import { storeToRefs } from 'pinia'

const { isFetching, isError, data, error, isLoading, selectedPhoto } = storeToRefs(useDataStore())
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

// onMounted(async () => {
//   await nextTick()
//   if (!isFetching.value && data.value.length > 0) {
//     gsap.from('.photo-item', {
//       opacity: 0,
//       y: 50,
//       stagger: 0.2,
//       duration: 0.8,
//       ease: 'power3.out'
//     })
//   }
// })
</script>

<template>
  <main>
    <div class="hero-banner">
      <div class="search-container">
        <h1 v-if="isFetching && debouncedQuery !== ''">
          Searching for <span>"{{ debouncedQuery }}"</span>
        </h1>
        <h1 v-if="!isFetching && debouncedQuery !== ''">
          Search Results for <span>"{{ debouncedQuery }}"</span>
        </h1>
        <BaseInput v-else v-model="query" />

        <p v-if="!isFetching && debouncedQuery !== ''" 3 @click="query = ''" class="clear">
          clear search
        </p>
      </div>
    </div>
    <div class="centered-container">
      <div :style="[isFetching && 'width: 100%']" class="photo-grid">
        <template v-if="isFetching">
          <div v-for="(i, index) in 8" :key="index" class="photo-item">
            <SkeletonShimmer />
          </div>
        </template>
        <div
          v-else
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
      </div>
    </div>

    <Modal :isOpen="isModalOpen" @close="closeModal">
      <div class="modal-content">
        <img :src="selectedPhoto?.urls?.regular" alt="Selected Photo" />
        <div class="modal-image-info">
          <p>{{ selectedPhoto?.user?.first_name }}</p>
          <span>{{ selectedPhoto?.user?.location }}</span>
        </div>
      </div>
    </Modal>
  </main>
</template>

<style lang="scss">
.hero-banner {
  background-color: #dde2e7;
  height: 280px;

  .search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;

    h1 {
      color: #2d374e;
      font-size: 42px;
      font-weight: 500;
    }

    span {
      color: #727a8a;
      text-transform: capitalize;
    }

    .clear {
      font-size: 12px;
      text-transform: capitalize;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.centered-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  width: 100%;
  padding: 2rem;
  transform: translateY(-80px);
  box-sizing: border-box;
}

.photo-grid {
  column-count: 3;
  column-gap: 1rem;
  max-width: 1000px;

  @media (max-width: 1024px) {
    column-count: 2;
  }

  @media (max-width: 640px) {
    column-count: 1;
  }
}

.photo-item {
  break-inside: avoid;
  margin-bottom: 1rem;
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 100%;
    display: block;
    border-radius: 0.5rem;
  }

  .image-info {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    color: #fff;
    z-index: 2;

    p {
      font-size: 1rem;
      font-weight: 600;
      margin: 0;
    }

    span {
      font-size: 0.875rem;
    }
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    border-radius: 0 0 0.5rem 0.5rem;
  }
}

.modal-content img {
  max-width: 100%;
  height: 400px;
  width: 100%;
  object-fit: cover;
  border-radius: 8px 8px 0px 0px;
  margin-bottom: 15px;
}

.modal-image-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}
</style>
