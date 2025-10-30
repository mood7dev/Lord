<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

// ProductDetail 컴포넌트가 props로 'product'를 받지 않을 경우를 대비하여
// URL 파라미터로 직접 상품을 조회하도록 변경합니다.
const props = defineProps({
  product: {
    type: Object,
    required: false,
    default: null,
  },
  isQuickView: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "add-to-cart"]);

// ===============================================
// 1. 하드코딩된 전체 상품 데이터
// ===============================================
const ALL_PRODUCTS_DATA = [
  // newitem
  {
    id: "n1",
    name: "올리브 캐미슬 롬퍼",
    price: 45000,
    originalPrice: 56000,
    discount: 20,
    code: "NITEM001",
    isNew: true,
    images: [
      "/assets/item1.jpg",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
    ],
  },
  {
    id: "n2",
    name: "스타일리시 애슬레저 세트",
    price: 52000,
    originalPrice: 58000,
    discount: 10,
    code: "NITEM002",
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=720",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=600&fit=crop",
    ],
  },
  {
    id: "n3",
    name: "오버핏 스웨이드 자켓",
    price: 71000,
    originalPrice: 89000,
    discount: 20,
    code: "NITEM003",
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=600&fit=crop",
    ],
  },
  {
    id: "n4",
    name: "네추럴 플라워 원피스",
    price: 48000,
    originalPrice: 69000,
    discount: 30,
    code: "NITEM004",
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=600&fit=crop",
    ],
  },
  {
    id: "n5",
    name: "슬림핏 슬랙스",
    price: 52000,
    originalPrice: 68000,
    discount: 24,
    code: "NITEM005",
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
    ],
  },
  // todayship
  {
    id: "t1",
    name: "린넨 와이드 팬츠",
    price: 39000,
    originalPrice: 49000,
    discount: 20,
    code: "TDY001",
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
    ],
  },
  {
    id: "t2",
    name: "베이직 코튼 티셔츠",
    price: 19000,
    originalPrice: 25000,
    discount: 24,
    code: "TDY002",
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1714070700737-24acfe6b957c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
    ],
  },
  // outlet
  {
    id: "o1",
    name: "아울렛 니트 가디건",
    price: 29000,
    originalPrice: 59000,
    discount: 51,
    code: "OUT001",
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1758981400298-78cd18eb6793?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    ],
  },
  // 모든 상품을 ProductDetail에서 필요로 하는 상세 정보 (images 등)를 포함하여 나열해야 합니다.
  // 이 예시에서는 n2의 상세 정보만 추가했습니다.
  // n2의 상세 정보:
  // (ProductCard에서 price, originalPrice, discount 외에 images, code, isNew 등의 정보가 필요합니다.)
];

// ===============================================
// 2. 라우트 및 데이터 상태 관리
// ===============================================
const route = useRoute();
const detailProduct = ref(null);
const selectedColor = ref("");
const selectedSize = ref("");
const quantity = ref(0);
const currentImage = ref(0);

const colors = [
  { id: "navy", name: "네이비", code: "#1e3a5f" },
  { id: "black", name: "블랙", code: "#000000" },
  { id: "gray", name: "그레이", code: "#666666" },
  { id: "beige", name: "베이지", code: "#d4c5b0" },
];

const sizes = ["S", "M", "L", "XL"];

// ===============================================
// 3. Computed & Methods
// ===============================================
const currentProduct = computed(() => {
  // props.product가 전달되면 그것을 사용하고, 아니면 detailProduct을 사용
  return props.product || detailProduct.value;
});

const totalPrice = computed(() => {
  return currentProduct.value ? currentProduct.value.price * quantity.value : 0;
});

const formatPrice = (price) => {
  return price.toLocaleString("ko-KR");
};

const selectColor = (colorId) => {
  selectedColor.value = colorId;
};

const selectSize = (size) => {
  selectedSize.value = size;
  if (quantity.value === 0) {
    quantity.value = 1;
  }
};

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const addToCart = () => {
  if (!selectedColor.value || !selectedSize.value) {
    alert("색상과 사이즈를 선택해주세요.");
    return;
  }

  emit("add-to-cart", {
    ...currentProduct.value,
    color: selectedColor.value,
    size: selectedSize.value,
    quantity: quantity.value,
  });
};

const closeQuickView = () => {
  emit("close");
};

const nextImage = () => {
  if (
    currentProduct.value &&
    currentImage.value < currentProduct.value.images.length - 1
  ) {
    currentImage.value++;
  }
};

const prevImage = () => {
  if (currentImage.value > 0) {
    currentImage.value--;
  }
};

// ===============================================
// 4. 상품 데이터 조회 로직 (Mounted 시 실행)
// ===============================================
onMounted(() => {
  if (!props.product) {
    const productId = route.params.id;

    // 전체 상품 목록에서 ID에 해당하는 상품 찾기
    const foundProduct = ALL_PRODUCTS_DATA.find((p) => p.id === productId);

    if (foundProduct) {
      // 상세 정보를 추가합니다. (예: images가 모든 상품에 있어야 함)
      // n2에 images, code, isNew가 없어서 오류가 났을 수 있으므로 직접 추가합니다.
      const dataWithDetails = {
        ...foundProduct,
        images: foundProduct.images || [
          "https://via.placeholder.com/600x800?text=Default+Image",
        ],
        code: foundProduct.code || "NOCODE",
        isNew: foundProduct.isNew === undefined ? false : foundProduct.isNew,
        originalPrice: foundProduct.originalPrice || foundProduct.price,
        discount: foundProduct.discount || 0,
      };

      // n2 상세 페이지 이미지 세부 정보 추가 (예시)
      if (productId === "n2" && dataWithDetails.images.length < 2) {
        dataWithDetails.images = [
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=720",
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=600&fit=crop",
          "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=600&fit=crop",
        ];
      }

      detailProduct.value = dataWithDetails;
    } else {
      // 상품을 찾지 못했을 경우 404 처리 (예: 경고 로그만 남기기)
      console.error(`상품 ID ${productId}를 찾을 수 없습니다.`);
    }
  }
});
</script>

<template>
  <div
    v-if="currentProduct"
    :class="['product-detail', { 'quick-view': isQuickView }]"
  >
    <button v-if="isQuickView" class="close-btn" @click="closeQuickView">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <div class="product-container">
      <div class="product-images">
        <div class="main-image">
          <img
            :src="currentProduct.images[currentImage]"
            :alt="currentProduct.name"
          />
          <button
            v-if="currentImage > 0"
            class="nav-btn prev"
            @click="prevImage"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            v-if="currentImage < currentProduct.images.length - 1"
            class="nav-btn next"
            @click="nextImage"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        <div class="thumbnail-list">
          <button
            v-for="(image, index) in currentProduct.images"
            :key="index"
            :class="['thumbnail', { active: currentImage === index }]"
            @click="currentImage = index"
          >
            <img :src="image" :alt="`${currentProduct.name} ${index + 1}`" />
          </button>
        </div>
      </div>

      <div class="product-info">
        <div class="badges">
          <span v-if="currentProduct.isNew" class="badge new">NEW</span>
          <span v-if="currentProduct.discount" class="badge sale">SALE</span>
        </div>

        <h1 class="product-title">{{ currentProduct.name }}</h1>

        <div class="price-section">
          <div v-if="currentProduct.discount" class="original-price">
            {{ formatPrice(currentProduct.originalPrice) }}원
          </div>
          <div class="current-price">
            <span class="price">{{ formatPrice(currentProduct.price) }}원</span>
            <span v-if="currentProduct.discount" class="discount"
              >{{ currentProduct.discount }}%</span
            >
          </div>
          <div class="reward-info">
            적립금 {{ formatPrice(Math.floor(currentProduct.price * 0.01)) }}원
            (1%)
          </div>
        </div>

        <div class="product-code">상품코드: {{ currentProduct.code }}</div>

        <div class="option-section">
          <label class="option-label">COLOR</label>
          <div class="color-options">
            <button
              v-for="color in colors"
              :key="color.id"
              :class="[
                'color-option',
                { selected: selectedColor === color.id },
              ]"
              :style="{ backgroundColor: color.code }"
              @click="selectColor(color.id)"
              :title="color.name"
            >
              <svg
                v-if="selectedColor === color.id"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="3"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <div class="option-section">
          <label class="option-label">SIZE</label>
          <div class="size-options">
            <button
              v-for="size in sizes"
              :key="size"
              :class="['size-option', { selected: selectedSize === size }]"
              @click="selectSize(size)"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <div v-if="quantity > 0" class="selected-item">
          <div class="item-info">
            <p class="item-name">{{ currentProduct.name }}</p>
            <p class="item-options">
              {{ colors.find((c) => c.id === selectedColor)?.name }} /
              {{ selectedSize }}
            </p>
          </div>
          <div class="quantity-control">
            <button class="qty-btn" @click="decreaseQuantity">-</button>
            <span class="qty-value">{{ quantity }}</span>
            <button class="qty-btn" @click="increaseQuantity">+</button>
          </div>
          <div class="item-price">{{ formatPrice(totalPrice) }}원</div>
        </div>

        <div class="total-section">
          <span class="total-label">총 상품금액 (수량)</span>
          <div class="total-price">
            <span class="price">{{ formatPrice(totalPrice) }}원</span>
            <span class="qty">({{ quantity }}개)</span>
          </div>
        </div>

        <div class="action-buttons">
          <button class="btn-wishlist">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              ></path>
            </svg>
          </button>
          <button class="btn-cart" @click="addToCart">장바구니</button>
          <button class="btn-buy">바로구매</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="not-found-message">
    <h2>상품 정보를 찾을 수 없습니다. (ID: {{ route.params.id }})</h2>
    <p>상품 ID를 확인하거나, 홈으로 돌아가세요.</p>
  </div>
</template>

<style scoped>
.product-detail {
  background: white;
  width: 100%;
}
.product-detail.quick-view {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
}
.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: 1px solid #ddd;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s;
}
.close-btn:hover {
  background: #f5f5f5;
  border-color: #333;
}
.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px;
}
.product-images {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.main-image {
  position: relative;
  width: 100%;
  aspect-ratio: 3/4;
  background: #f8f8f8;
  border-radius: 8px;
  overflow: hidden;
}
.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}
.nav-btn:hover {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.nav-btn.prev {
  left: 20px;
}
.nav-btn.next {
  right: 20px;
}
.thumbnail-list {
  display: flex;
  gap: 12px;
  overflow-x: auto;
}
.thumbnail {
  flex-shrink: 0;
  width: 80px;
  height: 106px;
  border: 2px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  background: none;
  padding: 0;
}
.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumbnail.active {
  border-color: #333;
}
.thumbnail:hover {
  border-color: #999;
}
.product-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.badges {
  display: flex;
  gap: 8px;
}
.badge {
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
}
.badge.new {
  background: #ffd700;
  color: white;
}
.badge.sale {
  background: #e74c3c;
  color: white;
}
.product-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0;
  line-height: 1.4;
}
.price-section {
  padding: 20px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.original-price {
  font-size: 16px;
  color: #999;
  text-decoration: line-through;
  margin-bottom: 8px;
}
.current-price {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}
.current-price .price {
  font-size: 32px;
  font-weight: 700;
  color: #333;
}
.current-price .discount {
  font-size: 24px;
  font-weight: 700;
  color: #e74c3c;
}
.reward-info {
  font-size: 14px;
  color: #666;
}
.product-code {
  font-size: 14px;
  color: #999;
}
.option-section {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}
.option-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}
.color-options {
  display: flex;
  gap: 12px;
}
.color-option {
  width: 48px;
  height: 48px;
  border: 2px solid #ddd;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.color-option.selected {
  border-color: #333;
  border-width: 3px;
}
.color-option:hover {
  transform: scale(1.1);
}
.size-options {
  display: flex;
  gap: 12px;
}
.size-option {
  min-width: 60px;
  padding: 12px 20px;
  border: 1px solid #ddd;
  background: white;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}
.size-option:hover {
  border-color: #333;
}
.size-option.selected {
  background: #333;
  color: white;
  border-color: #333;
}
.selected-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #f8f8f8;
  border-radius: 8px;
}
.item-info {
  flex: 1;
}
.item-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin: 0 0 6px 0;
}
.item-options {
  font-size: 13px;
  color: #666;
  margin: 0;
}
.quantity-control {
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 4px;
}
.qty-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: white;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}
.qty-btn:hover {
  background: #f5f5f5;
}
.qty-value {
  min-width: 40px;
  text-align: center;
  font-weight: 500;
}
.item-price {
  font-size: 18px;
  font-weight: 700;
  color: #333;
}
.total-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  border-top: 2px solid #333;
}
.total-label {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}
.total-price {
  display: flex;
  align-items: center;
  gap: 8px;
}
.total-price .price {
  font-size: 28px;
  font-weight: 700;
  color: #ffd700;
}
.total-price .qty {
  font-size: 16px;
  color: #666;
}
.action-buttons {
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  gap: 12px;
}
.btn-wishlist {
  width: 56px;
  height: 56px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}
.btn-wishlist:hover {
  border-color: #333;
  background: #f5f5f5;
}
.btn-cart {
  padding: 16px;
  border: 1px solid #333;
  background: white;
  color: #333;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}
.btn-cart:hover {
  background: #333;
  color: white;
}
.btn-buy {
  padding: 16px;
  border: none;
  background: #ffd700;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}
.btn-buy:hover {
  background: #ffc700;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}
.not-found-message {
  padding: 100px;
  text-align: center;
  color: #666;
}
.not-found-message h2 {
  color: #333;
  margin-bottom: 20px;
}
/* 태블릿 */
@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 20px;
  }
  .product-detail.quick-view {
    padding: 20px;
  }
  .product-title {
    font-size: 24px;
  }
  .current-price .price {
    font-size: 28px;
  }
  .action-buttons {
    grid-template-columns: 1fr 1fr;
  }
  .btn-wishlist {
    grid-column: 1 / -1;
    width: 100%;
  }
}
/* 모바일 */
@media (max-width: 480px) {
  .product-container {
    padding: 15px;
    gap: 30px;
  }
  .product-title {
    font-size: 20px;
  }
  .current-price .price {
    font-size: 24px;
  }
  .current-price .discount {
    font-size: 20px;
  }
  .thumbnail {
    width: 60px;
    height: 80px;
  }
  .selected-item {
    flex-wrap: wrap;
    gap: 12px;
  }
  .item-info {
    width: 100%;
  }
  .action-buttons {
    grid-template-columns: 1fr;
  }
  .btn-wishlist {
    grid-column: 1;
  }
}
</style>
