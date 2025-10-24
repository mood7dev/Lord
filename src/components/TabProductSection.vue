<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Scrollbar, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import ProductCard from "./ProductCard.vue";
import { useProductStore } from "../stores/productStore";

const activeTab = ref("newitem");
const store = useProductStore();

const tabs = [
  { id: "newitem", label: "NEW ITEM" },
  { id: "todayship", label: "오늘 출발" },
  { id: "outlet", label: "아울렛" },
];

const swiperModules = [Scrollbar, Mousewheel];
const products = {
  newitem: [
    {
      id: "n1",
      name: "올리브 캐미슬 롬퍼",
      price: 45000,
      originalPrice: 56000,
      discount: 20,
      soldPercentage: 75,
      image: "/assets/item1.jpg",
    },
    {
      id: "n2",
      name: "스타일리시 애슬레저 세트",
      price: 52000,
      originalPrice: 58000,
      discount: 10,
      soldPercentage: 60,
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=720",
    },
    {
      id: "n3",
      name: "오버핏 스웨이드 자켓",
      price: 71000,
      originalPrice: 89000,
      discount: 20,
      soldPercentage: 45,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=600&fit=crop",
    },
    {
      id: "n4",
      name: "네추럴 플라워 원피스",
      price: 48000,
      originalPrice: 69000,
      discount: 30,
      soldPercentage: 85,
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=600&fit=crop",
    },
    {
      id: "n5",
      name: "슬림핏 슬랙스",
      price: 52000,
      originalPrice: 68000,
      discount: 24,
      soldPercentage: 55,
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
    },
    {
      id: "n6",
      name: "루즈핏 캐주얼 니트 숄",
      price: 39000,
      originalPrice: 52000,
      discount: 25,
      soldPercentage: 70,
      image:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop",
    },
    {
      id: "n7",
      name: "레더 미니 스커트",
      price: 44000,
      originalPrice: 59000,
      discount: 25,
      soldPercentage: 80,
      image:
        "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=600&fit=crop",
    },
    {
      id: "n8",
      name: "데님 버튼업 원피스",
      price: 89000,
      originalPrice: 125000,
      discount: 29,
      soldPercentage: 40,
      image:
        "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&h=600&fit=crop",
    },
  ],
  todayship: [
    {
      id: "t1",
      name: "린넨 와이드 팬츠",
      price: 39000,
      originalPrice: 49000,
      discount: 20,
      soldPercentage: 55,
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
    },
    {
      id: "t2",
      name: "베이직 코튼 티셔츠",
      price: 19000,
      originalPrice: 25000,
      discount: 24,
      soldPercentage: 90,
      image:
        "https://images.unsplash.com/photo-1714070700737-24acfe6b957c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
    },
    {
      id: "t3",
      name: "데님 롱 스커트",
      price: 42000,
      originalPrice: 56000,
      discount: 25,
      soldPercentage: 70,
      image:
        "https://images.unsplash.com/photo-1726640131545-566e2ebf128c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    },
    {
      id: "t4",
      name: "브이넥 실크 블라우스",
      price: 58000,
      originalPrice: 78000,
      discount: 26,
      soldPercentage: 40,
      image:
        "https://plus.unsplash.com/premium_photo-1740409497402-b0e4931e6a05?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    },
    {
      id: "t5",
      name: "코튼 블루 도트 셔츠",
      price: 34000,
      originalPrice: 48000,
      discount: 29,
      soldPercentage: 65,
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=600&fit=crop",
    },
    {
      id: "t6",
      name: "플레어 미니 원피스",
      price: 45000,
      originalPrice: 62000,
      discount: 27,
      soldPercentage: 75,
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
    },
    {
      id: "t7",
      name: "와이드 카고 팬츠",
      price: 49000,
      originalPrice: 65000,
      discount: 25,
      soldPercentage: 50,
      image:
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=600&fit=crop",
    },
    {
      id: "t8",
      name: "크롭 후드 집업",
      price: 38000,
      originalPrice: 52000,
      discount: 27,
      soldPercentage: 85,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=600&fit=crop",
    },
  ],
  outlet: [
    {
      id: "o1",
      name: "아울렛 니트 가디건",
      price: 29000,
      originalPrice: 59000,
      discount: 51,
      soldPercentage: 95,
      image:
        "https://images.unsplash.com/photo-1758981400298-78cd18eb6793?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    },
    {
      id: "o2",
      name: "시즌 오프 코트",
      price: 89000,
      originalPrice: 189000,
      discount: 53,
      soldPercentage: 88,
      image:
        "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=600&fit=crop",
    },
    {
      id: "o3",
      name: "프리미엄 울 머플러",
      price: 25000,
      originalPrice: 55000,
      discount: 55,
      soldPercentage: 65,
      image:
        "https://images.unsplash.com/photo-1583170492868-dd617c96fdee?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
    },
    {
      id: "o4",
      name: "코발트 블루 힐 스틸레토",
      price: 69000,
      originalPrice: 149000,
      discount: 54,
      soldPercentage: 78,
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=600&fit=crop",
    },
    {
      id: "o5",
      name: "울 블렌드 그레이 코트",
      price: 99000,
      originalPrice: 219000,
      discount: 55,
      soldPercentage: 92,
      image:
        "https://images.unsplash.com/photo-1632577743431-2b2d91e5dc8a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=769",
    },
    {
      id: "o6",
      name: "캐시미어 터틀넥",
      price: 45000,
      originalPrice: 98000,
      discount: 54,
      soldPercentage: 88,
      image:
        "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=400&h=600&fit=crop",
    },
    {
      id: "o7",
      name: "스웨이드 로퍼",
      price: 55000,
      originalPrice: 128000,
      discount: 57,
      soldPercentage: 75,
      image:
        "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=600&fit=crop",
    },
    {
      id: "o8",
      name: "트위드 미니 스커트",
      price: 38000,
      originalPrice: 89000,
      discount: 57,
      soldPercentage: 82,
      image:
        "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=600&fit=crop",
    },
  ],
};
const formatPrice = (price) => {
  return price.toLocaleString("ko-KR");
};
const addToCart = (product) => {
  store.addToCart(product);
};
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
          v-for="product in products[activeTab]"
          :key="product.id"
          class="product-slide"
        >
          <div class="product-wrapper">
            <ProductCard :product="product" @add-to-cart="addToCart" />
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
      </swiper>
    </div>
  </section>
</template>

<style scoped>
.tabbed-products-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 40px 0 40px;
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
