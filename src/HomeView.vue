<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";

import HeroBanner from "@/components/HeroBanner.vue";
import ProductCard from "@/components/ProductCard.vue";
import TabProductSection from "@/components/TabProductSection.vue";
import Review from "@/components/Review.vue";
import QuickViewModal from "@/components/QuickViewModal.vue";
import ProductDetail from "@/components/ProductDetail.vue";
import { useProductStore } from "@/stores/productStore";

const store = useProductStore();
const showCoupon = ref(true);
const productSlide = ref(0);

const isQuickViewOpen = ref(false);
const quickViewProduct = ref(null);
const scrollBarWidth = ref(0);

const closeQuickView = () => {
  isQuickViewOpen.value = false;
  quickViewProduct.value = null;
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
  document.body.style.setProperty("--scroll-bar-width", "0px");
  scrollBarWidth.value = 0;
};

const openQuickView = (product) => {
  // 퀵뷰 열릴 때 쿠폰 닫기
  showCoupon.value = false;

  const width = window.innerWidth - document.documentElement.clientWidth;

  quickViewProduct.value = product;
  isQuickViewOpen.value = true;
  scrollBarWidth.value = width;

  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${width}px`;
  document.body.style.setProperty("--scroll-bar-width", `${width}px`);
};

const handleAddToCartFromQuickView = (item) => {
  store.addToCart(item);
  closeQuickView();
};

const handleKeydown = (event) => {
  if (isQuickViewOpen.value && event.key === "Escape") {
    closeQuickView();
  }
};

const { banners, currentBanner, featuredProducts } = storeToRefs(store);

const safePageCount = computed(() => {
  return Array.isArray(featuredProducts.value)
    ? Math.ceil(featuredProducts.value.length / 4)
    : 0;
});

const nextBanner = () => store.nextBanner();
const prevBanner = () => store.prevBanner();
const setBanner = (index) => store.setBanner(index);

const nextProducts = () => {
  if (productSlide.value < safePageCount.value - 1) {
    productSlide.value++;
  }
};

const prevProducts = () => {
  if (productSlide.value > 0) {
    productSlide.value--;
  }
};

let bannerInterval;

onMounted(() => {
  bannerInterval = setInterval(() => {
    nextBanner();
  }, 5000);
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  if (bannerInterval) {
    clearInterval(bannerInterval);
  }
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div>
    <HeroBanner
      :banners="banners"
      :current-banner="currentBanner"
      @next="nextBanner"
      @prev="prevBanner"
      @set-banner="setBanner"
    />

    <main class="main-content">
      <section class="weekly-best">
        <div class="section-header">
          <h2 class="section-title">WEEKLY BEST ITEMS</h2>
          <p class="section-subtitle">실시간 주목폭발 인기상품</p>
        </div>

        <div class="products-carousel">
          <button
            v-if="productSlide > 0"
            class="carousel-btn carousel-btn-prev"
            @click="prevProducts"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div class="products-wrapper">
            <div
              class="products-container"
              :style="{ transform: `translateX(-${productSlide * 100}%)` }"
            >
              <div
                v-for="page in safePageCount"
                :key="page"
                class="products-page"
              >
                <ProductCard
                  v-for="product in featuredProducts.slice(
                    (page - 1) * 4,
                    page * 4
                  )"
                  :key="product.id"
                  :product="product"
                  @open-quickview="openQuickView"
                />
              </div>
            </div>
          </div>

          <button
            v-if="productSlide < safePageCount - 1"
            class="carousel-btn carousel-btn-next"
            @click="nextProducts"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div class="carousel-indicators">
          <button
            v-for="page in safePageCount"
            :key="page"
            :class="['indicator', { active: productSlide === page - 1 }]"
            @click="productSlide = page - 1"
          ></button>
        </div>
      </section>
    </main>

    <div class="more-btn-container">
      <button class="more-btn">MORE ›</button>
    </div>

    <TabProductSection @close-coupon="showCoupon = false" />

    <Review />

    <transition name="coupon-fade">
      <div v-if="showCoupon" class="coupon-popup">
        <button class="coupon-close" @click="showCoupon = false">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <button class="coupon-download">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </button>

        <div class="coupon-content">
          <div class="coupon-brand">LORD</div>
          <div class="coupon-text">신규회원</div>
          <span>웰컴 쿠폰 증정</span>
        </div>

        <div class="coupon-value">
          <img
            src="/assets/coupon.png"
            alt="쿠폰 이미지"
            class="coupon-image"
          />
        </div>
      </div>
    </transition>

    <QuickViewModal
      :is-visible="isQuickViewOpen"
      @close="closeQuickView"
      v-if="quickViewProduct"
    >
      <ProductDetail
        :product="quickViewProduct"
        :is-quick-view="true"
        @add-to-cart="handleAddToCartFromQuickView"
        @close="closeQuickView"
      />
    </QuickViewModal>
  </div>
</template>

<style scoped>
.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 40px 0 40px;
}

.weekly-best {
  margin-bottom: 80px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 40px;
  font-weight: 700;
  color: #333;
  margin: 0 0 12px 0;
  letter-spacing: 2px;
}

.section-subtitle {
  font-size: 20px;
  color: #666;
  margin: 0;
}

.products-carousel {
  position: relative;
  padding: 0 60px;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  z-index: 10;
}

.carousel-btn:hover {
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.carousel-btn-prev {
  left: 0;
}

.carousel-btn-next {
  right: 0;
}

.products-wrapper {
  overflow: hidden;
}

.products-container {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.products-page {
  min-width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ddd;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.indicator.active {
  display: none;
}

.more-btn-container {
  display: flex;
  justify-content: center;
  margin-top: -40px;
  margin-bottom: 20px;
}

.more-btn {
  padding: 14px 60px;
  background: white;
  border: 1px solid #ddd;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s;
}

.more-btn:hover {
  border-color: #333;
  color: #333;
}

.coupon-popup {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 450px;
  height: 180px;
  background: linear-gradient(135deg, #2c2b28 0%, #4a4945 55%);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 1500;
  display: flex;
  overflow: hidden;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    bottom: -200px;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

.coupon-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 10;
  color: white;
}

.coupon-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.coupon-download {
  position: absolute;
  top: 12px;
  right: 52px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 10;
  color: white;
}

.coupon-download:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(2px);
}

.coupon-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 37px;
  color: white;
}

.coupon-brand {
  font-size: 48px;
  font-weight: 700;
  font-family: serif;
  margin-bottom: 8px;
  letter-spacing: -2px;
}

.coupon-text {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.5px;
  white-space: pre-line;
}

.coupon-image {
  width: 220px;
  height: auto;
  margin-top: 52px;
  margin-left: 32px;
}

.coupon-fade-enter-active {
  transition: opacity 0.3s, transform 0.3s;
}

.coupon-fade-leave-active {
  transition: all 0s;
}

.coupon-fade-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

.coupon-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%);
}

@media (max-width: 1024px) {
  .main-content {
    padding: 60px 30px 0 30px;
  }

  .section-title {
    font-size: 32px;
  }

  .section-subtitle {
    font-size: 18px;
  }

  .products-carousel {
    padding: 0 50px;
  }

  .products-page {
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
  }

  .carousel-btn {
    width: 45px;
    height: 45px;
  }

  .carousel-btn svg {
    width: 24px;
    height: 24px;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 60px 30px 0 30px;
  }
  .products-page {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 30px 15px 0 15px;
  }

  .weekly-best {
    margin-bottom: 60px;
  }

  .section-header {
    margin-bottom: 40px;
  }

  .section-title {
    font-size: 24px;
    letter-spacing: 1px;
  }

  .section-subtitle {
    font-size: 14px;
  }

  .products-page {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .more-btn {
    padding: 12px 40px;
    font-size: 13px;
  }

  .coupon-popup {
    width: calc(100% - 30px);
    max-width: 380px;
    height: 150px;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  .coupon-content {
    margin-left: 25px;
  }

  .coupon-brand {
    font-size: 36px;
    margin-bottom: 6px;
  }

  .coupon-text {
    font-size: 14px;
  }

  .coupon-image {
    width: 160px;
    margin-top: 40px;
    margin-left: 20px;
  }

  .coupon-close,
  .coupon-download {
    width: 28px;
    height: 28px;
    top: 10px;
  }

  .coupon-close svg,
  .coupon-download svg {
    width: 16px;
    height: 16px;
  }

  .coupon-download {
    right: 46px;
  }
}

@media (max-width: 360px) {
  .section-title {
    font-size: 20px;
  }

  .section-subtitle {
    font-size: 12px;
  }

  .coupon-popup {
    width: calc(100% - 20px);
    height: 130px;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
  }

  .coupon-content {
    margin-left: 20px;
  }

  .coupon-brand {
    font-size: 30px;
    margin-bottom: 4px;
  }

  .coupon-text {
    font-size: 12px;
  }

  .coupon-image {
    width: 130px;
    margin-top: 35px;
    margin-left: 15px;
  }
}
</style>
