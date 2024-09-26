<template>
  <div class="skeleton-image">
    <div class="skeleton-trail"></div>
    <div class="skeleton-trail"></div>
  </div>
</template>

<style scoped lang="scss">
.skeleton-image {
  width: 100%;
  height: 200px;
  background-color: #e0e0e08c;
  border-radius: 8px;
  position: relative;
  padding: 3rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -150%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(224, 224, 224, 0) 0%,
      rgba(224, 224, 224, 0.5) 50%,
      rgba(224, 224, 224, 0) 100%
    );
    animation: shimmer 1.5s infinite;
  }

  .skeleton-trail {
    position: relative;
    height: 20px;
    width: 100%;
    max-width: 200px;
    margin-bottom: 10px;
    background-color: #e0e0e0;
    border-radius: 8px;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 10%;
      left: -150%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        rgba(224, 224, 224, 0) 0%,
        rgba(224, 224, 224, 0.5) 50%,
        rgba(224, 224, 224, 0) 100%
      );
      animation: shimmer 1.5s infinite;
    }
  }
}

@keyframes shimmer {
  100% {
    left: 150%;
  }
}
</style>
