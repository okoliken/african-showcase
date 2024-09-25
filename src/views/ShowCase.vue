<script setup lang="ts">
import { BaseInput } from '@/components/ui'
</script>

<template>
  <div class="hero-banner">
    <div class="search-container">
      <BaseInput />
    </div>
  </div>
</template>

<style lang="scss">
.hero-banner {
  background-color: #dde2e7;
  height: 300px;

  .search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
