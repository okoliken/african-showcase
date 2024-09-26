<template>
  <Teleport defer to="body">
    <div v-if="isVisible" class="modal-overlay" ref="modalOverlay" @click.self="initiateClose">
      <div class="modal-content" ref="modalContent">
        <slot></slot>
      </div>

      <svg
        class="modal-close"
        @click="initiateClose"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100"
        height="100"
        viewBox="0,0,256,256"
      >
        <g
          fill-opacity="1"
          fill="#fff"
          fill-rule="nonzero"
          stroke="none"
          stroke-width="1"
          stroke-linecap="butt"
          stroke-linejoin="miter"
          stroke-miterlimit="10"
          stroke-dasharray=""
          stroke-dashoffset="0"
          font-family="none"
          font-weight="none"
          font-size="none"
          text-anchor="none"
          style="mix-blend-mode: normal"
        >
          <g transform="scale(10.66667,10.66667)">
            <path
              transform="translate(-4.97056,12.0003) rotate(-45.001)"
              d="M11,0.7h2v22.6h-2z"
            ></path>
            <path
              transform="translate(-4.97056,12.0003) rotate(-45.001)"
              d="M0.7,11h22.6v2h-22.6z"
            ></path>
          </g>
        </g>
      </svg>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { gsap } from 'gsap'

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits(['close'])

const modalContent = ref<HTMLElement | null>(null)
const modalOverlay = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const initiateClose = () => {
  closeModalAnimation()
}

const closeModal = () => {
  isVisible.value = false
  emit('close')
}

watch(
  () => props.isOpen,
  async (newVal) => {
    if (newVal) {
      isVisible.value = true
      await nextTick()
      openModalAnimation()
    } else {
      closeModalAnimation()
    }
  }
)

const openModalAnimation = () => {
  if (modalOverlay.value && modalContent.value) {
    gsap.fromTo(
      modalOverlay.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    )
    gsap.fromTo(
      modalContent.value,
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
    )
  }
}

const closeModalAnimation = () => {
  if (modalOverlay.value && modalContent.value) {
    gsap.to(modalOverlay.value, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: closeModal
    })
    gsap.to(modalContent.value, {
      opacity: 0,
      scale: 0.7,
      duration: 0.3,
      ease: 'power2.in'
    })
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/modal.scss';
</style>
