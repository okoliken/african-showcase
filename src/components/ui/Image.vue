<template>
  <div class="photo-wrapper">
    <div class="photo-overlay">
      <img
        v-if="!isLoading"
        :src="photo?.urls?.regular"
        :alt="photo?.description || 'Photo'"
        class="photo-image"
        loading="lazy"
      />
      <div v-else class="photo-placeholder">Loading...</div>
      <div v-if="!isLoading" class="overlay"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useImage } from '@vueuse/core'
import { type PropType } from 'vue'

const props = defineProps({
  photo: {
    type: Object as PropType<{
      urls: { regular: string }
      description?: string
    }>,
    required: true
  }
})

const { isLoading } = useImage({ src: props.photo?.urls?.regular })
</script>

<style scoped lang="scss">
.photo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  position: relative;
  // aspect-ratio: 5 / 6;

  .photo-overlay {
    position: relative;
    width: 100%;
    // aspect-ratio: 5 / 6;
    overflow: hidden;
    border-radius: 10px;

    .photo-image {
      width: 100%;
      height: 100%;
      // aspect-ratio: 5 / 6;
      object-fit: cover;
      z-index: 1;
    }

    .photo-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000;
      font-size: 18px;
      z-index: 2;
    }

    .overlay {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
      border-radius: 10px;
      z-index: 3;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .photo-overlay:hover .overlay {
      opacity: 1;
    }
  }
}
</style>
