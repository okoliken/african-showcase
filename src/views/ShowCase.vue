<script setup lang="ts">
import { ref } from 'vue'
import { refDebounced, watchDebounced } from '@vueuse/core'
import { BaseInput, Image, SkeletonShimmer, Modal } from '@/components/ui'
import { useDataStore } from '../stores/data'
import { storeToRefs } from 'pinia'

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

<style lang="scss">
.hero-banner {
  background-color: #dde2e7;
  min-height: 280px; // Changed from fixed height to min-height
  padding: 40px 20px; // Added padding for better spacing on smaller screens

  .search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    max-width: 1200px; // Added max-width for larger screens
    margin: 0 auto; // Center the content

    h1 {
      color: #2d374e;
      font-size: 42px;
      font-weight: 500;
      text-align: center; // Ensure text is centered on all screen sizes
      margin-bottom: 20px; // Add some space below the heading
    }

    span {
      color: #727a8a;
      text-transform: capitalize;
    }

    .clear {
      font-size: 12px;
      text-transform: capitalize;
      cursor: pointer;
      margin-top: 10px; // Add some space above the clear button
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .hero-banner {
    min-height: 220px;
    padding: 30px 15px;

    .search-container {
      h1 {
        font-size: 32px;
      }
    }
  }
}

@media (max-width: 480px) {
  .hero-banner {
    min-height: 180px;

    .search-container {
      h1 {
        font-size: 24px;
      }

      span {
        font-size: 14px;
      }

      .clear {
        font-size: 10px;
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

.no-results {
  text-align: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  margin-top: 2rem;

  p {
    font-size: 1.2rem;
    color: #6c757d;
    margin-bottom: 1rem;
  }
}

.center-items {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
