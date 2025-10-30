<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";

import HeaderNav from "./components/HeaderNav.vue";
import HeroBanner from "./components/HeroBanner.vue";
import ProductCard from "./components/ProductCard.vue";
import TabProductSection from "./components/TabProductSection.vue";
import Review from "./components/Review.vue";
import { useProductStore } from "./stores/productStore";

const store = useProductStore();
const showCart = ref(false);
const showCoupon = ref(true);
const productSlide = ref(0);

const { banners, currentBanner, products, cart } = storeToRefs(store);

const cartCount = computed(() => store.cartCount);

const safePageCount = computed(() => {
  return Array.isArray(products.value)
    ? Math.ceil(products.value.length / 4)
    : 0;
});

const totalPrice = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const addToCart = (product) => {
  store.addToCart(product);
};

const removeFromCart = (productId) => {
  store.removeFromCart(productId);
};

const updateQuantity = (productId, delta) => {
  store.updateQuantity(productId, delta);
};

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

const formatPrice = (price) => {
  return price.toLocaleString("ko-KR");
};

let bannerInterval;

onMounted(() => {
  bannerInterval = setInterval(() => {
    nextBanner();
  }, 5000);
});

onUnmounted(() => {
  if (bannerInterval) {
    clearInterval(bannerInterval);
  }
});
</script>

<template>
  <div class="app">
    <HeaderNav :cart-count="cartCount" @show-cart="showCart = true" />

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
                  v-for="product in products.slice((page - 1) * 4, page * 4)"
                  :key="product.id"
                  :product="product"
                  @add-to-cart="addToCart"
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

    <transition name="cart">
      <div v-if="showCart" class="cart-overlay" @click="showCart = false">
        <div class="cart-sidebar" @click.stop>
          <div class="cart-header">
            <h2>Shopping Cart</h2>
            <button class="close-btn" @click="showCart = false">
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
          </div>

          <div class="cart-content">
            <div v-if="cart.length === 0" class="cart-empty">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                opacity="0.2"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path
                  d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                ></path>
              </svg>
              <p>장바구니가 비어있습니다</p>
            </div>

            <div v-else class="cart-items">
              <div v-for="item in cart" :key="item.id" class="cart-item">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="cart-item-image"
                />
                <div class="cart-item-info">
                  <h3 class="cart-item-name">{{ item.name }}</h3>
                  <p class="cart-item-price">{{ formatPrice(item.price) }}원</p>
                  <div class="cart-item-actions">
                    <button
                      class="qty-btn"
                      @click="updateQuantity(item.id, -1)"
                    >
                      -
                    </button>
                    <span class="qty-value">{{ item.quantity }}</span>
                    <button class="qty-btn" @click="updateQuantity(item.id, 1)">
                      +
                    </button>
                    <button class="remove-btn" @click="removeFromCart(item.id)">
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="cart.length > 0" class="cart-footer">
            <div class="cart-total">
              <span>Total:</span>
              <span class="total-price">{{ formatPrice(totalPrice) }}원</span>
            </div>
            <button class="checkout-btn">주문하기</button>
          </div>
        </div>
      </div>
    </transition>

    <div class="more-btn-container">
      <button class="more-btn">MORE ›</button>
    </div>

    <TabProductSection />

    <Review />

    <!-- 쿠폰 팝업 -->
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

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>브랜드 소개</h3>
          <ul class="footer-policy">
            <li><a href="#">이용약관</a></li>
            <li><a href="#">이용안내</a></li>
            <li><a href="#">개인정보처리방침</a></li>
          </ul>

          <ul>
            <li><a href="#">회사소개</a></li>
            <li><a href="#">제휴문의</a></li>
            <li><a href="#">자주 묻는 질문</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>ABOUT ATTRANGS</h3>
          <ul>
            <li><a>로드그룹 주식회사</a></li>
            <li>
              <a>대표자 : 김동우 | 개인정보보호책임자 : 최이진</a>
            </li>
            <li>
              <a href="#">사업자 등록번호 안내 : [201-12-34567]</a>
            </li>
            <li>
              <a>통신판매업 신고 : 2015-대구동구-0112호</a>
            </li>
            <li>
              <a>주소: 111212 대구 동구 가평로 시즌빌딩 4층</a>
            </li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>고객 센터</h3>
          <ul>
            <li><a>1588-1234</a></li>
            <li><a>상담 가능 시간</a></li>
            <li><a>월~금 : am 11 ~ pm 5 / 점심시간 : pm 12 ~ 1</a></li>
            <li><a>(토/일/공휴일은 휴무)</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>교환 반품</h3>
          <ul>
            <li>
              <a>대구 동구 가평로 시즌빌딩 4층(가평로 21) 로드</a>
            </li>
            <li><a href="#">CJ대한통운: 1588-1255</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 LORD. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: white;
}

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
  background: #333;
  width: 30px;
  border-radius: 6px;
}

.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
}

.cart-sidebar {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 450px;
  background: white;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #eee;
}

.cart-header h2 {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #ffd700;
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
}

.cart-empty svg {
  margin-bottom: 16px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.cart-item-image {
  width: 96px;
  height: 128px;
  object-fit: cover;
  border-radius: 6px;
}

.cart-item-info {
  flex: 1;
}

.cart-item-name {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 8px 0;
}

.cart-item-price {
  font-size: 18px;
  font-weight: 700;
  color: #ffd700;
  margin: 0 0 12px 0;
}

.cart-item-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.qty-btn:hover {
  background: #f5f5f5;
}

.qty-value {
  font-weight: 500;
  min-width: 20px;
  text-align: center;
}

.remove-btn {
  margin-left: auto;
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 14px;
  transition: color 0.3s;
}

.remove-btn:hover {
  color: #c0392b;
}

.cart-footer {
  border-top: 1px solid #eee;
  padding: 24px;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
}

.total-price {
  color: #ffd700;
}

.checkout-btn {
  width: 100%;
  padding: 16px;
  background: #ffd700;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.checkout-btn:hover {
  background: #ffc700;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}

.cart-enter-active,
.cart-leave-active {
  transition: opacity 0.3s;
}

.cart-enter-from,
.cart-leave-to {
  opacity: 0;
}

.cart-enter-active .cart-sidebar,
.cart-leave-active .cart-sidebar {
  transition: transform 0.3s;
}

.cart-enter-from .cart-sidebar,
.cart-leave-to .cart-sidebar {
  transform: translateX(100%);
}

.footer {
  background: #1a1a1a;
  color: #999;
  padding: 60px 40px 30px;
  margin-top: 80px;
}

.footer-content {
  display: flex;
  max-width: 1400px;
  margin: 0 auto 50px;
  gap: 60px;
}

.footer-section {
  flex: 1;
}

.footer-section:first-child {
  margin-left: 0;
}

.footer-section:last-child {
  margin-right: 0;
}

.footer-section h3 {
  color: white;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 20px 0;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section li {
  margin-bottom: 12px;
}

.footer-section a {
  color: #999;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: #ffd700;
}

.footer-bottom {
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 30px;
  border-top: 1px solid #333;
  text-align: center;
  font-size: 14px;
}

.footer-policy {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-policy li {
  position: relative;
}

.footer-policy li:not(:last-child)::after {
  content: "|";
  color: #aaa;
  margin: 0 10px;
}

.footer-policy a {
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
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

.coupon-fade-enter-active,
.coupon-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.coupon-fade-enter-from,
.coupon-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
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

  .cart-sidebar {
    width: 400px;
  }
}

/* 태블릿 (768px 이하) - 푸터 추가 */
@media (max-width: 768px) {
  .footer {
    padding: 50px 30px 25px;
  }

  .footer-content {
    flex-wrap: wrap;
    gap: 40px;
  }

  .footer-section {
    flex: 1 1 calc(50% - 20px);
    min-width: 200px;
  }

  .footer-section h3 {
    font-size: 16px;
  }

  .footer-section a {
    font-size: 13px;
    word-break: keep-all;
  }
}

/* 모바일 (480px 이하) */
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

  .cart-sidebar {
    width: 100%;
    max-width: 100%;
  }

  .cart-header h2 {
    font-size: 20px;
  }

  .cart-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .cart-item-image {
    width: 100%;
    max-width: 200px;
    height: auto;
    aspect-ratio: 2/3;
  }

  .cart-item-info {
    width: 100%;
  }

  .cart-item-actions {
    justify-content: center;
  }

  .checkout-btn {
    font-size: 15px;
    padding: 14px;
  }

  /* 푸터 반응형 */
  .footer {
    padding: 40px 20px 20px;
    margin-top: 60px;
  }

  .footer-content {
    flex-direction: column;
    gap: 35px;
    margin-bottom: 30px;
  }

  .footer-section {
    flex: none;
    width: 100%;
  }

  .footer-section h3 {
    font-size: 15px;
    margin-bottom: 15px;
  }

  .footer-section ul {
    margin-bottom: 15px;
  }

  .footer-section li {
    margin-bottom: 10px;
    line-height: 1.6;
  }

  .footer-section a {
    font-size: 13px;
    word-break: keep-all;
    line-height: 1.6;
  }

  .footer-policy {
    flex-direction: column;
    gap: 0;
  }

  .footer-policy li {
    margin-bottom: 10px;
  }

  .footer-policy li:not(:last-child)::after {
    display: none;
  }

  .footer-bottom {
    padding-top: 20px;
    font-size: 12px;
  }

  /* 쿠폰 팝업 반응형 */
  .coupon-popup {
    width: calc(100% - 30px);
    max-width: 380px;
    height: 150px;
    bottom: 20px;
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

/* 초소형 모바일 (360px 이하) */
@media (max-width: 360px) {
  .section-title {
    font-size: 20px;
  }

  .section-subtitle {
    font-size: 12px;
  }

  .footer-section h3 {
    font-size: 14px;
  }

  .footer-section a {
    font-size: 12px;
  }

  .coupon-popup {
    width: calc(100% - 20px);
    height: 130px;
    bottom: 15px;
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
