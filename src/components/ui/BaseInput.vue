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
    <input type="text" class="search-input" placeholder="Search for photo" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.search-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  .search-input {
    width: 100%;
    padding: 25px 40px 25px 56px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    background-color: #fff;
    color: #333;
    transition: box-shadow 0.3s ease;
    outline: none;
    appearance: none;
    -webkit-box-shadow: 10px 86px 115px 46px rgba(211, 211, 211, 0.91);
    -moz-box-shadow: 10px 86px 115px 46px rgba(211, 211, 211, 0.91);
    box-shadow: 10px 86px 115px 46px rgba(211, 211, 211, 0.91);
    &::placeholder {
      color: #333333;
    }

    &:focus {
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }
  }

  .search-icon {
    position: absolute;
    top: 50.5%;
    left: 16px;
    transform: translateY(-50%);
    color: #999;
    pointer-events: none;
  }
}
</style>
