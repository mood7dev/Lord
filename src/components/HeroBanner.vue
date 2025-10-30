<script setup>
defineProps({
  banners: {
    type: Array,
    required: true,
  },
  currentBanner: {
    type: Number,
    required: true,
  },
});

defineEmits(["next", "prev", "set-banner"]);
</script>

<template>
  <section class="hero">
    <template v-if="banners && banners.length > 0">
      <div class="banner-container">
        <div
          v-for="(banner, index) in banners"
          :key="banner.id"
          :class="['banner-slide', { active: currentBanner === index }]"
        >
          <img :src="banner.image" :alt="banner.title" class="banner-image" />
          <div
            class="banner-content"
            :class="{ 'yellow-text': banner.id === 1 }"
            v-if="banner.title"
          >
            <h1 class="banner-title">{{ banner.title }}</h1>
            <p class="banner-subtitle">{{ banner.subtitle }}</p>
          </div>
        </div>
      </div>

      <button class="banner-btn banner-btn-prev" @click="$emit('prev')">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button class="banner-btn banner-btn-next" @click="$emit('next')">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <div class="banner-indicators">
        <button
          v-for="(banner, index) in banners"
          :key="banner.id"
          :class="['indicator', { active: currentBanner === index }]"
          @click="$emit('set-banner', index)"
        ></button>
      </div>
    </template>

    <div v-else class="loading-placeholder">배너 로딩 중...</div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
}

.banner-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.banner-slide {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.banner-slide.active {
  opacity: 1;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
  transition: filter 0.3s;
}

.banner-content {
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 1;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
}

.banner-content.yellow-text {
  color: #fff6c4;
}

.banner-title {
  font-size: 72px;
  font-weight: 700;
  margin: 0 0 16px 0;
  letter-spacing: 8px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.banner-subtitle {
  font-size: 32px;
  font-weight: 300;
  margin: 0;
  letter-spacing: 4px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.banner-btn {
  position: absolute;
  top: 60%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 2;
}

.banner-btn:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: translateY(-50%) scale(1.1);
}

.banner-btn-prev {
  left: 40px;
}

.banner-btn-next {
  right: 40px;
}

.banner-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 2;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.indicator.active {
  background: white;
  width: 30px;
  border-radius: 6px;
}

.loading-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 18px;
  color: #666;
}

@media (max-width: 1200px) {
  .banner-btn,
  .banner-btn-prev,
  .banner-btn-next {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .hero {
    height: 450px;
  }

  .banner-title {
    font-size: 48px;
    letter-spacing: 4px;
    margin: 0 0 12px 0;
  }

  .banner-subtitle {
    font-size: 24px;
    letter-spacing: 2px;
  }

  .banner-indicators {
    bottom: 20px;
    gap: 10px;
  }

  .indicator {
    width: 10px;
    height: 10px;
  }

  .indicator.active {
    width: 24px;
  }
  /* 제거된 스타일
  .banner-image.custom-fit {
    margin-top: 50px;
    transform: scale(1.05);
  }
*/
}

@media (max-width: 480px) {
  .hero {
    height: 350px;
  }

  .banner-content {
    top: 60%;
    padding: 0 15px;
  }

  .banner-title {
    font-size: 32px;
    letter-spacing: 2px;
    margin: 0 0 8px 0;
  }

  .banner-subtitle {
    font-size: 16px;
    letter-spacing: 1px;
  }

  .banner-indicators {
    bottom: 15px;
    gap: 8px;
  }

  .indicator {
    width: 8px;
    height: 8px;
  }

  .indicator.active {
    width: 20px;
  }
  /* 제거된 스타일
  .banner-image.custom-fit {
    margin-top: 30px;
    transform: scale(1);
  }
*/
}

@media (max-width: 360px) {
  .hero {
    height: 300px;
  }

  .banner-title {
    font-size: 24px;
    letter-spacing: 1px;
  }

  .banner-subtitle {
    font-size: 14px;
    letter-spacing: 0.5px;
  }
}
</style>
