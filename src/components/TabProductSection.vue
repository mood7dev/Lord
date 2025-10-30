<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Scrollbar, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import ProductCard from "./ProductCard.vue";
import ProductDetail from "./ProductDetail.vue";
import QuickViewModal from "./QuickViewModal.vue";
import { useProductStore } from "../stores/productStore";

const activeTab = ref("newitem");
const store = useProductStore();

const isQuickViewOpen = ref(false);
const selectedProduct = ref(null);

const emit = defineEmits(["close-coupon"]);

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

const closeQuickView = () => {
  isQuickViewOpen.value = false;
  selectedProduct.value = null;
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
};

const openQuickView = (product) => {
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  const productDetailData = store.getProductById(product.id);

  selectedProduct.value = {
    ...product,
    ...(productDetailData || {}),
  };

  emit("close-coupon");

  isQuickViewOpen.value = true;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollBarWidth}px`;
};

const handleKeydown = (event) => {
  if (isQuickViewOpen.value && event.key === "Escape") {
    closeQuickView();
  }
};

watch(isQuickViewOpen, (newVal) => {}, { immediate: true });

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
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

  <QuickViewModal
    :is-visible="isQuickViewOpen"
    @close="closeQuickView"
    v-if="selectedProduct"
  >
    <ProductDetail
      :product="selectedProduct"
      :isQuickView="true"
      @close="closeQuickView"
      @add-to-cart="addToCart"
    />
  </QuickViewModal>
</template>

<style scoped>
.tabbed-products-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 40px 0 50px;
}

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
  padding: 10px 0 30px 0;
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
}
</style>
