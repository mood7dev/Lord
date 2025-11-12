<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";

import HeaderNav from "./components/HeaderNav.vue";
import { useProductStore } from "./stores/productStore";

const store = useProductStore();
const showCart = ref(false);

const { cart } = storeToRefs(store);

const cartCount = computed(() => store.cartCount);

const totalPrice = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const removeFromCart = (cartItemId) => {
  store.removeFromCart(cartItemId);
};

const increaseQuantity = (cartItemId) => {
  store.increaseQuantity(cartItemId);
};

const decreaseQuantity = (cartItemId) => {
  store.decreaseQuantity(cartItemId);
};

const formatPrice = (price) => {
  return price.toLocaleString("ko-KR");
};
</script>

<template>
  <div class="app">
    <HeaderNav :cart-count="cartCount" @show-cart="showCart = true" />

    <router-view />

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
              <div v-for="item in cart" :key="item.cartId" class="cart-item">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="cart-item-image"
                />
                <div class="cart-item-info">
                  <h3 class="cart-item-name">{{ item.name }}</h3>
                  <p class="cart-item-options">
                    {{ item.color }} / {{ item.size }}
                  </p>
                  <p class="cart-item-price">{{ formatPrice(item.price) }}원</p>
                  <div class="cart-item-actions">
                    <button
                      class="qty-btn"
                      @click="decreaseQuantity(item.cartId)"
                    >
                      -
                    </button>
                    <span class="qty-value">{{ item.quantity }}</span>
                    <button
                      class="qty-btn"
                      @click="increaseQuantity(item.cartId)"
                    >
                      +
                    </button>
                    <button
                      class="remove-btn"
                      @click="removeFromCart(item.cartId)"
                    >
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

.cart-item-options {
  font-size: 14px;
  color: #666;
  margin: 0 0 4px 0;
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

@media (max-width: 1024px) {
  .cart-sidebar {
    width: 400px;
  }
}

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

@media (max-width: 480px) {
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
}
</style>
