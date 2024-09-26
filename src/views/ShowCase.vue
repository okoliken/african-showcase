<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { BaseInput, Image, SkeletonShimmer } from '@/components/ui'
import { useDataStore } from '../stores/data'
import { storeToRefs } from 'pinia'

const { isFetching, isError, data, error } = storeToRefs(useDataStore())

onMounted(async () => {
  await nextTick()
  if (!isFetching.value && data.value.length > 0) {
    gsap.from('.photo-item', {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out'
    })
  }
})
</script>

<template>
  <main>
    <div class="hero-banner">
      <div class="search-container">
        <BaseInput />
      </div>
    </div>
    <div class="centered-container">
      <div :style="[isFetching && 'width: 100%']" class="photo-grid">
        <template v-if="isFetching">
          <div v-for="(i, index) in 8" :key="index" class="photo-item">
            <SkeletonShimmer />
          </div>
        </template>
        <div v-else v-for="(photo, index) in data" :key="index" class="photo-item">
          <Image :photo="photo" />
          <div class="image-info">
            <p>{{ photo?.user?.first_name }}</p>
            <span>{{ photo?.user?.location }}</span>
          </div>
          <div class="overlay"></div>
        </div>
      </div>
    </div>
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
    height: 100%;
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
</style>
