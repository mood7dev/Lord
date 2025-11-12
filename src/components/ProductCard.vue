<script setup>
import { useRouter } from "vue-router";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["open-quickview"]);

const router = useRouter();

const formatPrice = (price) => {
  return price.toLocaleString("ko-KR");
};

const navigateToDetail = () => {
  router.push({
    name: "ProductDetail",
    params: { id: props.product.id },
  });
};

const openQuickView = (event) => {
  event.stopPropagation();
  emit("open-quickview", props.product);
};
</script>

<template>
  <div class="product-card" @click="navigateToDetail">
    <div class="product-image-wrapper">
      <img :src="product.image" :alt="product.name" class="product-image" />
      <div class="product-overlay">
        <button class="btn-quick-view" @click="openQuickView">
          Quick View
        </button>
      </div>
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ formatPrice(product.price) }}원</p>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  cursor: pointer;
  transition: transform 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;
  overflow: hidden;
  border-radius: 8px;
  background: #f5f5f5;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
  transform: translateZ(0);
}

.product-card:hover .product-image {
  transform: scale(1.08) translateZ(0);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  opacity: 0;
  transition: opacity 0.5s;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.btn-quick-view {
  padding: 12px 30px;
  border: 2px solid white;
  background: transparent;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 4px;
  letter-spacing: 1px;
}

.btn-quick-view:hover {
  background: #ffd700;
  border-color: #ffd700;
  color: #333;
}

.product-info {
  padding: 16px 4px;
}

.product-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0 0 8px 0;
}

.product-price {
  font-size: 18px;
  font-weight: 700;
  color: #ffd700;
  margin: 0;
}
</style>
