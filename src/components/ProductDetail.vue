<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "@/stores/productStore";

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

const emit = defineEmits(["close"]);

const productStore = useProductStore();

const route = useRoute();
const detailProduct = ref(null);
const selectedColor = ref("");
const selectedSize = ref("");
const quantity = ref(1);
const currentImage = ref(0);
const isWished = ref(false);

const colors = [
  { id: "navy", name: "네이비", code: "#1e3a5f" },
  { id: "black", name: "블랙", code: "#000000" },
  { id: "gray", name: "그레이", code: "#666666" },
  { id: "beige", name: "베이지", code: "#d4c5b0" },
];

const sizes = ["S", "M", "L", "XL"];

const getColorName = (colorId) => {
  return colors.find((c) => c.id === colorId)?.name;
};

const currentProduct = computed(() => {
  const productData = props.product || detailProduct.value;

  if (productData && (!productData.images || productData.images.length === 0)) {
    return {
      ...productData,
      images: [
        productData.image ||
          "https://via.placeholder.com/600x800?text=Default+Image",
      ],
    };
  }

  return productData;
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
  if (!currentProduct.value) return;

  if (!selectedColor.value || !selectedSize.value) {
    alert("색상과 사이즈를 선택해주세요.");
    return;
  }

  productStore.addToCart({
    ...currentProduct.value,
    color: getColorName(selectedColor.value),
    size: selectedSize.value,
    quantity: quantity.value,
  });

  if (props.isQuickView) {
    alert(
      `${currentProduct.value.name} (${getColorName(selectedColor.value)}, ${
        selectedSize.value
      }) ${quantity.value}개가 장바구니에 담겼습니다.`
    );
    closeQuickView();
  } else {
    alert(
      `${currentProduct.value.name} (${getColorName(selectedColor.value)}, ${
        selectedSize.value
      }) ${quantity.value}개가 장바구니에 담겼습니다.`
    );
  }
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

const toggleWishlist = () => {
  isWished.value = !isWished.value;
};

onMounted(() => {
  if (!props.product) {
    const productId = route.params.id;

    const foundProduct = productStore.getProductById(productId);

    if (foundProduct) {
      detailProduct.value = {
        ...foundProduct,
        images: foundProduct.images || [foundProduct.image],
      };

      if (quantity.value === 0) {
        quantity.value = 1;
      }
    } else {
      console.error(`상품 ID ${productId}를 찾을 수 없습니다. (Pinia Store)`);
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

        <div v-if="quantity > 0 && selectedSize" class="selected-item">
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
          <button
            :class="['btn-wishlist', { 'is-wished': isWished }]"
            @click="toggleWishlist"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              :fill="isWished ? 'currentColor' : 'none'"
              stroke="currentColor"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              ></path>
            </svg>
          </button>
          <button class="btn-cart" @click="addToCart">장바구니</button>
          <button class="btn-buy">구매하기</button>
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
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s;
}

.close-btn:hover {
  background: #f5f5f5;
  border-color: transparent;
}
.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px;
  margin-top: 140px;
}

.product-detail.quick-view .product-container {
  margin-top: 0;
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
  transition: all 0.3s ease-in-out;
}
.btn-wishlist:hover {
  border-color: #333;
  background: #f5f5f5;
}

.btn-wishlist.is-wished {
  border-color: #e74c3c;
}
.btn-wishlist.is-wished svg {
  color: #e74c3c;
  stroke-width: 2;
  animation: heart-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    heart-float 0.4s ease-out;
}

@keyframes heart-pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes heart-float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
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
