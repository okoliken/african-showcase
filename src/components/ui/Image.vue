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
      <!-- Use skeleton when loading -->
      <div v-else class="photo-placeholder">
        <div class="skeleton"></div>
      </div>
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

// Ensure that the image loading state is handled correctly
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

  .photo-overlay {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
    cursor: pointer;

    .photo-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
    }

    .photo-placeholder {
      width: 100%;
      height: 100%;
      background-color: #f3f3f3;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      z-index: 2;

      .skeleton {
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.2) 25%,
          rgba(255, 255, 255, 0.5) 50%,
          rgba(255, 255, 255, 0.2) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 10px;
      }
    }

    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
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
