<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Scrollbar, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import ProductCard from "./ProductCard.vue";
import ProductDetail from "./ProductDetail.vue";
import { useProductStore } from "../stores/productStore";

const activeTab = ref("newitem");
const store = useProductStore();

const isQuickViewOpen = ref(false);
const selectedProduct = ref(null);

const tabs = [
  { id: "newitem", label: "NEW ITEM" },
  { id: "todayship", label: "오늘 출발" },
  { id: "outlet", label: "아울렛" },
];

const swiperModules = [Scrollbar, Mousewheel];

const currentTabProducts = computed(() => {
  if (activeTab.value === "newitem") {
    return store.products.filter((p) => p.id.startsWith("n"));
  }
  if (activeTab.value === "todayship") {
    return store.products.filter((p) => p.id.startsWith("t"));
  }
  if (activeTab.value === "outlet") {
    return store.products.filter((p) => p.id.startsWith("o"));
  }
  return [];
});

const formatPrice = (price) => {
  return price.toLocaleString("ko-KR");
};

const addToCart = (product) => {
  store.addToCart(product);

  if (isQuickViewOpen.value) {
    closeQuickView();
  }
};

const openQuickView = (product) => {
  const productDetailData = store.getProductById(product.id);

  selectedProduct.value = {
    ...product,
    ...(productDetailData || {}),
  };

  isQuickViewOpen.value = true;
};

const closeQuickView = () => {
  isQuickViewOpen.value = false;
  selectedProduct.value = null;
};

// ----------------------------------------------------
// QuickViewModal 로직 (Teleport와 함께 스크롤/키보드 제어) 병합
// ----------------------------------------------------

// Esc 키를 눌렀을 때 모달을 닫는 핸들러
const handleKeydown = (event) => {
  if (isQuickViewOpen.value && event.key === "Escape") {
    closeQuickView();
  }
};

// isQuickViewOpen이 변경될 때마다 body 스크롤을 제어
watch(
  isQuickViewOpen,
  (newVal) => {
    document.body.style.overflow = newVal ? "hidden" : "";
  },
  { immediate: true }
);

onMounted(() => {
  // 컴포넌트 마운트 시 Esc 키 이벤트 리스너 등록
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  // 컴포넌트 언마운트 시 이벤트 리스너 제거 및 스크롤 복원
  document.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <section class="tabbed-products-section">
    <div class="tabs-container">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="products-slider">
      <swiper
        :modules="swiperModules"
        :slides-per-view="'auto'"
        :space-between="20"
        :scrollbar="{ draggable: true }"
        :mousewheel="{ forceToAxis: true }"
        class="products-swiper"
      >
        <swiper-slide
          v-for="product in currentTabProducts"
          :key="product.id"
          class="product-slide"
        >
          <div class="product-wrapper">
            <ProductCard
              :product="product"
              @add-to-cart="addToCart"
              @open-quickview="openQuickView"
            />

            <div class="product-extra-info">
              <div class="price-detail-info">
                <span v-if="product.originalPrice" class="original-price-small">
                  {{ formatPrice(product.originalPrice) }}원
                </span>
                <span class="current-price-small">
                  {{ formatPrice(product.price) }}원
                </span>
                <span v-if="product.discount" class="discount-badge-small">
                  {{ product.discount }}%
                </span>
              </div>
            </div>
          </div>
        </swiper-slide>

        <swiper-slide
          v-if="currentTabProducts.length === 0"
          class="product-slide-empty"
        >
          <div class="empty-message">
            <p>선택된 탭의 상품이 Pinia Store에 없습니다.</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>

  <Teleport to="body">
    <transition name="modal-fade">
      <div
        v-if="isQuickViewOpen && selectedProduct"
        class="modal-backdrop"
        @click.self="closeQuickView"
      >
        <div class="modal-content-wrapper">
          <ProductDetail
            :product="selectedProduct"
            :isQuickView="true"
            @close="closeQuickView"
            @add-to-cart="addToCart"
          />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.tabbed-products-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 40px 0 40px;
}
/* ----------------------------------
 * 탭/슬라이더 CSS (유지)
 * ---------------------------------- */
.tabs-container {
  display: flex;
  justify-content: flex-start;
  gap: 30px;
}
.tab-btn {
  padding: 10px 0;
  background: none;
  border: none;
  font-size: 20px;
  font-weight: 600;
  color: #999;
  opacity: 0.7;
  cursor: pointer;
  transition: all 0.3s;
  letter-spacing: 0.5px;
}
.tab-btn:hover {
  color: #333;
}
.tab-btn.active {
  color: #333;
  font-weight: 600;
  opacity: 1;
  font-size: 20px;
}
.products-slider {
  position: relative;
}
.products-swiper {
  padding: 10px 0 30px;
}
.product-slide {
  width: calc(25% - 15px) !important;
  min-width: 280px;
}
.product-wrapper {
  display: flex;
  flex-direction: column;
}
.product-extra-info {
  margin-top: 12px;
}
.price-detail-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: -30px auto 10px 5px;
}
.original-price-small {
  font-size: 19px;
  color: #999;
  text-decoration: line-through;
}
.current-price-small {
  font-size: 20px;
  font-weight: 700;
  color: #333;
}
.discount-badge-small {
  font-size: 20px;
  font-weight: 700;
  color: #e74c3c;
}
:deep(.swiper-scrollbar) {
  background: #f0f0f0;
  height: 4px;
}
:deep(.swiper-scrollbar-drag) {
  background: #333;
  border-radius: 2px;
}
:deep(.product-card .product-price) {
  display: none !important;
}
.product-slide-empty {
  width: auto !important;
}
.empty-message {
  padding: 30px;
  font-size: 16px;
  color: #999;
  text-align: center;
  border: 1px dashed #ddd;
  border-radius: 8px;
  margin-top: 20px;
}

/* ----------------------------------
 * ⭐️ QuickViewModal CSS 병합 (최종 모달 디자인)
 * ---------------------------------- */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  padding: 40px 20px;
}

.modal-content-wrapper {
  /* ⭐️ HomeView 모달과 동일한 1200px 너비로 통일 */
  max-width: 1200px;
  width: 100%;
  background-color: white;
  border-radius: 0; /* 이미지처럼 직각 모서리로 설정 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

/* ----------------------------------
 * Transition (애니메이션)
 * ---------------------------------- */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-content-wrapper,
.modal-fade-leave-active .modal-content-wrapper {
  transition: transform 0.3s ease;
}

.modal-fade-enter-from .modal-content-wrapper,
.modal-fade-leave-to .modal-content-wrapper {
  transform: translateY(-50px);
}

/* ----------------------------------
 * Responsive (반응형)
 * ---------------------------------- */
@media (max-width: 768px) {
  .tabs-container {
    gap: 30px;
  }
  .tab-btn {
    font-size: 14px;
  }
  .product-slide {
    min-width: 240px;
  }

  .modal-content-wrapper {
    /* 모바일에서는 화면을 꽉 채우도록 설정 */
    border-radius: 0;
    max-width: 100%;
    /* ⭐️ min-height를 100vh로 수정하여 모바일에서 화면 높이를 꽉 채우도록 통일 */
    min-height: 100vh;
    margin: 0;
    overflow-y: auto;
  }
  .modal-backdrop {
    padding: 0;
    align-items: flex-start;
  }
}
</style>
