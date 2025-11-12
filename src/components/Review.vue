<script setup>
import { ref, computed } from "vue";

const isDropdownOpen = ref(false);
const selectedSort = ref("최신 리뷰순");

const sortOptions = [
  "최신 리뷰순",
  "리뷰 많은순",
  "상품 평점순",
  "최근 판매량순",
];

const reviewsData = ref([
  {
    id: 1,
    productName: "화이트 오프숄더 드레스",
    price: 52000,
    image: "/assets/item2.jpg",
    reviewRating: 4.2,
    reviewCount: 120,
    reviewTextLines: [
      `핏이 정말 예쁘고 신축성도 좋아요! 배송도 빠르고 안전하게 잘 도착했어요. 상품도 만족스럽고 감사합니다~^^`,
      `마네킹처럼 맵시가 나진 않지만 그래도 이쁜 옷이라 자주 입을 거 같아요.`,
      `배송도 빠르고 좋았어요 감사합니다~^^`,
    ],
    date: new Date("2025-10-20"),
    sales: 450,
  },
  {
    id: 2,
    productName: "네추럴 플라워 원피스",
    price: 48000,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=600&fit=crop",
    reviewRating: 4.8,
    reviewCount: 999,
    reviewTextLines: [
      `플라워 패턴이 제 취향입니다!! 핏도 좋고 너무나도 맘에 쏙들어 재구매를 생각 중이에요`,
      `고려하고싶어요! 배송도 빠르고 상품도 좋고^^`,
      `여성스러움을 강조해주고, 허리 라인을 예쁘게 잡아줘요.`,
    ],
    date: new Date("2025-10-22"),
    sales: 1200,
  },
  {
    id: 3,
    productName: "올리브 캐미슬 롬퍼",
    price: 45000,
    image: "/assets/item1.jpg",
    reviewRating: 4.9,
    reviewCount: 580,
    reviewTextLines: [
      `여름에 편하게 입을 올인원 찾다가 너무 예뻐서 바로 시켰어요!`,
      `생각보다 배송도 빨리 와서 만족스러웠습니다 :) 전체적으로 품질도 좋고 너무 만족해요.`,
      `여름에 시원하게 입기 좋을 거 같아요~ 색감도 화사하고 너무 이뻐요!!`,
    ],
    date: new Date("2025-10-18"),
    sales: 820,
  },
  {
    id: 4,
    productName: "오버핏 스웨이드 자켓",
    price: 71000,
    image:
      "https://images.unsplash.com/photo-1631473352507-8264912737bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    reviewRating: 4.3,
    reviewCount: 730,
    reviewTextLines: [
      `이번 시즌에도 너무나 잘 어울리는 모던한 디자인입니다.`,
      `소재질도 좋고 편하고 가장 중요한 건 몸매를 감춰주고 고급스러워 보인다는 거예요`,
      `어떤 옷이랑 매치해도 잘 어울리고 정말 잘 샀다는 생각이 듭니다.`,
    ],
    date: new Date("2025-10-15"),
    sales: 650,
  },
  {
    id: 5,
    productName: "베이직 린넨 셔츠",
    price: 38000,
    image:
      "https://images.unsplash.com/photo-1740711152088-88a009e877bb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
    reviewRating: 4.5,
    reviewCount: 420,
    reviewTextLines: [
      `린넨 소재라 시원하고 통풍이 잘 돼서 여름에 딱이에요!`,
      `세탁해도 형태가 잘 유지되고 구김도 오히려 멋스러워요`,
      `심플한 디자인이라 어디든 매치하기 좋습니다~`,
    ],
    date: new Date("2025-10-21"),
    sales: 1500,
  },
  {
    id: 6,
    productName: "플리츠 미디 스커트",
    price: 42000,
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=600&fit=crop",
    reviewRating: 4.7,
    reviewCount: 650,
    reviewTextLines: [
      `플리츠가 정말 예쁘게 잡혀있어요! 움직일 때마다 우아하게 흔들려요`,
      `허리 밴딩이라 편하면서도 라인이 예쁘게 나와요`,
      `길이도 딱 좋고 어떤 상의랑 입어도 잘 어울려요!`,
    ],
    date: new Date("2025-10-19"),
    sales: 1050,
  },
  {
    id: 7,
    productName: "데님 오버롤 팬츠",
    price: 54000,
    image:
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=600&fit=crop",
    reviewRating: 4.4,
    reviewCount: 380,
    reviewTextLines: [
      `빈티지한 느낌 너무 좋아요! 핏도 생각보다 예쁘게 나와요`,
      `데님 소재가 튼튼하고 색감도 사진이랑 똑같아요`,
      `캐주얼하게 입기 딱 좋고 스타일링하기도 편해요`,
    ],
    date: new Date("2025-10-23"),
    sales: 720,
  },
  {
    id: 8,
    productName: "니트 카디건 세트",
    price: 67000,
    image:
      "https://plus.unsplash.com/premium_photo-1695339146416-65bfe01ec18d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    reviewRating: 4.6,
    reviewCount: 850,
    reviewTextLines: [
      `니트 촉감이 부드럽고 따뜻해요! 겨울에 자주 입을 것 같아요`,
      `세트 구성이라 코디 고민 없이 바로 입을 수 있어서 좋아요`,
      `색상도 고급스럽고 핏도 너무 예뻐서 대만족입니다!`,
    ],
    date: new Date("2025-10-17"),
    sales: 1400,
  },
]);

const reviews = computed(() => {
  const sorted = [...reviewsData.value];

  switch (selectedSort.value) {
    case "최신 리뷰순":
      sorted.sort((a, b) => b.date - a.date);
      break;
    case "리뷰 많은순":
      sorted.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "상품 평점순":
      sorted.sort((a, b) => b.reviewRating - a.reviewRating);
      break;
    case "최근 판매량순":
      sorted.sort((a, b) => b.sales - a.sales);
      break;
    default:
      break;
  }

  return sorted.slice(0, 4);
});

const formatPrice = (price) => {
  return price.toLocaleString("ko-KR");
};

const formatReviewCount = (count) => {
  if (count >= 999) return "리뷰 999+";
  return `리뷰 ${Math.floor(count / 100) * 100}+`;
};

const toggleSort = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectSort = (option) => {
  selectedSort.value = option;
  isDropdownOpen.value = false;
};

const truncateHTML = (text, limit) => {
  if (!text) return "";
  if (text.length <= limit) return text;

  return `${text.slice(0, limit)}<span class='ellipsis'> ···</span>`;
};
</script>

<template>
  <section class="review-section">
    <div class="section-title-wrapper">
      <h2 class="section-title">REVIEW</h2>
    </div>

    <div class="section-sort-wrapper">
      <div class="dropdown-container">
        <button class="section-subtitle-btn" @click="toggleSort">
          {{ selectedSort }}
          <span :class="['sort-icon', { open: isDropdownOpen }]">></span>
        </button>

        <div class="dropdown-menu" v-if="isDropdownOpen">
          <button
            v-for="option in sortOptions"
            :key="option"
            @click="selectSort(option)"
            :class="['dropdown-item', { active: option === selectedSort }]"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </div>

    <div class="reviews-grid">
      <div v-for="review in reviews" :key="review.id" class="review-card">
        <div class="review-image-wrapper">
          <img
            :src="review.image"
            :alt="review.productName"
            class="review-image"
          />
        </div>

        <div class="product-info-wrapper">
          <h3 class="product-name">{{ review.productName }}</h3>
          <p class="product-price">{{ formatPrice(review.price) }}원</p>
        </div>

        <div class="review-meta-box">
          <i class="bi bi-star-fill star-icon"></i>
          <span class="review-rating">{{ review.reviewRating }}</span>
          <span class="review-count">{{
            formatReviewCount(review.reviewCount)
          }}</span>
        </div>

        <div class="review-text-lines">
          <p
            v-for="(line, index) in review.reviewTextLines"
            :key="index"
            class="review-line"
            v-html="truncateHTML(line, 54)"
          ></p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.review-section {
  max-width: 1400px;
  margin: 80px auto;
  padding: 0 40px 0;
}

.section-title-wrapper {
  text-align: start;
  margin-bottom: 10px;
}

.section-title {
  font-size: 40px;
  font-weight: 700;
  color: #333;
  margin: 0;
  letter-spacing: 2px;
}

.section-sort-wrapper {
  margin-bottom: 10px;
}

.dropdown-container {
  position: relative;
  display: inline-block;
}

.section-subtitle-btn {
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.section-subtitle-btn:hover {
  background: #fff;
  border-color: #d9d9d9;
}

.sort-icon {
  margin-left: 5px;
  font-weight: 600;
  color: #666;
  transition: transform 0.3s;
  display: inline-block;
}

.sort-icon.open {
  transform: rotate(90deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: -10px;
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  background: none;
  border: none;
  text-align: left;
  padding: 10px 15px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.dropdown-item.active {
  font-weight: 600;
  background-color: #eee;
  color: #000;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  align-items: stretch;
}

.review-card {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 0;
}

.product-info-wrapper {
  margin-top: 15px;
  margin-bottom: 0;
  padding: 0;
  border-bottom: none;
}

.product-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.product-price {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.review-meta-box {
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-top: 15px;
  margin-bottom: 0;
  padding: 0;
  border-bottom: none;
}

.star-icon {
  margin-right: 4px;
  color: gold;
  font-size: 14px;
}

.review-rating {
  font-weight: 700;
  color: #333;
  margin-right: 8px;
}

.review-count {
  color: #999;
}

.review-text-lines {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  margin-top: 15px;
  border-top: 1px solid #e0e0e0;
}

.review-line {
  font-size: 12.5px;
  line-height: 1.5;
  color: #666;
  margin: 0;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
}

.review-line:last-of-type {
  border-bottom: none;
}

:deep(.ellipsis) {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #999;
}

.review-image-wrapper {
  width: 100%;
  aspect-ratio: 2/3;
  overflow: hidden;
  background: #f5f5f5;
  border-radius: 0;
}

.review-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 1024px) {
  .reviews-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .reviews-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
