<template>
  <div class="search-container">
    <div class="search-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
    <input v-model="model" type="text" class="search-input" placeholder="Search for photo" />
  </div>
</template>

<script setup lang="ts">
const model = defineModel({ default: '' })
</script>

<style lang="scss">
.search-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  .search-input {
    width: 100%;
    padding: 20px 20px 20px 50px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    background-color: #fff;
    color: #333;
    transition: box-shadow 0.3s ease;
    outline: none;
    font-family: 'Poppins', sans-serif;
    appearance: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &::placeholder {
      color: #333333;
    }

    &:focus {
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }
  }

  .search-icon {
    position: absolute;
    top: 50%;
    left: 36px;
    transform: translateY(-50%);
    color: #999;
    pointer-events: none;
  }
}

@media (max-width: 768px) {
  .search-container {
    .search-input {
      font-size: 14px;
      padding: 15px 15px 15px 40px;
    }

    .search-icon {
      left: 31px;
      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
}

@media (max-width: 480px) {
  .search-container {
    .search-input {
      font-size: 12px;
      padding: 12px 12px 12px 36px;
    }

    .search-icon {
      left: 27px;
      svg {
        width: 14px;
        height: 14px;
      }
    }
  }
}
</style>
