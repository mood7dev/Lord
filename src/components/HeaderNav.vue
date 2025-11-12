<script setup>
import { ref, onMounted, onUnmounted } from "vue";

defineProps({
  cartCount: {
    type: Number,
    default: 0,
  },
});

defineEmits(["show-cart"]);

const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header :class="['header', { scrolled: isScrolled }]">
    <div class="top-bar">
      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <i class="bi" :class="isMobileMenuOpen ? 'bi-x' : 'bi-list'"></i>
      </button>

      <router-link to="/" class="logo">LORD</router-link>

      <!-- 스크롤 시에만 표시될 중앙 메뉴 -->
      <nav class="main-nav-inline">
        <a href="#" class="main-nav-link">메뉴</a>
        <a href="#" class="main-nav-link">NEW</a>
        <a href="#" class="main-nav-link">BEST</a>
        <a href="#" class="main-nav-link">땡처리특가</a>
        <a href="#" class="main-nav-link">SET</a>
        <a href="#" class="main-nav-link">OUTER</a>
        <a href="#" class="main-nav-link">DRESS</a>
        <a href="#" class="main-nav-link">TOP</a>
        <a href="#" class="main-nav-link">BOTTOM</a>
        <a href="#" class="main-nav-link">ACC</a>
      </nav>

      <nav class="top-nav" :class="{ 'mobile-open': isMobileMenuOpen }">
        <div class="mobile-main-menu">
          <a href="#" class="mobile-main-link">메뉴</a>
          <a href="#" class="mobile-main-link">NEW</a>
          <a href="#" class="mobile-main-link">BEST</a>
          <a href="#" class="mobile-main-link">땡처리특가</a>
          <a href="#" class="mobile-main-link">SET</a>
          <a href="#" class="mobile-main-link">OUTER</a>
          <a href="#" class="mobile-main-link">DRESS</a>
          <a href="#" class="mobile-main-link">TOP</a>
          <a href="#" class="mobile-main-link">BOTTOM</a>
          <a href="#" class="mobile-main-link">ACC</a>
        </div>
        <div class="menu-divider"></div>
        <a href="#" class="nav-link">LOGIN</a>
        <span class="divider">|</span>
        <a href="#" class="nav-link">JOIN US</a>
        <span class="divider">|</span>
        <a href="#" class="nav-link">ORDER</a>
        <span class="divider">|</span>
        <a href="#" class="nav-link cart-link" @click.prevent="$emit('show-cart')">
          CART
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </a>
        <span class="divider">|</span>
        <a href="#" class="nav-link">MY PAGE</a>
        <button class="search-btn">
          <input type="text" class="search-input" />
          <i class="bi bi-search search-icon"></i>
        </button>
      </nav>
    </div>

    <!-- 스크롤 전에만 표시될 별도 메뉴 라인 -->
    <nav class="main-nav">
      <a href="#" class="main-nav-link">메뉴</a>
      <a href="#" class="main-nav-link">NEW</a>
      <a href="#" class="main-nav-link">BEST</a>
      <a href="#" class="main-nav-link">땡처리특가</a>
      <a href="#" class="main-nav-link">SET</a>
      <a href="#" class="main-nav-link">OUTER</a>
      <a href="#" class="main-nav-link">DRESS</a>
      <a href="#" class="main-nav-link">TOP</a>
      <a href="#" class="main-nav-link">BOTTOM</a>
      <a href="#" class="main-nav-link">ACC</a>
    </nav>
  </header>

  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
  />
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  border-bottom: 1px solid #eee;
  transition: all 0.3s;
  position: relative;
}

.logo {
  text-decoration: none;
  color: #ffd700;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s;
}

.mobile-menu-btn {
  display: none;
}

.mobile-main-menu {
  display: none;
}

.menu-divider {
  display: none;
}

.top-nav {
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #ffd700;
}

.cart-link {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -19px;
  background: #ffd700;
  color: white;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: bold;
}

.divider {
  color: #ddd;
}

.search-btn {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.search-input {
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  padding: 4px 0;
  font-size: 14px;
  color: #333;
  width: 120px;
  background: transparent;
}

.search-input::placeholder {
  color: #ccc;
}

.search-icon {
  font-size: 18px;
  color: #999;
  pointer-events: none;
}

.main-nav {
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 18px 40px;
  background: white;
  transition: all 0.3s;
}

.main-nav-inline {
  display: none;
  gap: 30px;
  position: absolute;
  left: 50%;
  transform: translateX(-80%);
}

.main-nav-link {
  color: #333;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s;
  position: relative;
  white-space: nowrap;
}

.main-nav-link::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: #ffd700;
  transition: width 0.3s;
}

.main-nav-link:hover {
  color: #ffd700;
}

.main-nav-link:hover::after {
  width: 100%;
}

/* === 스크롤 후 한 줄로 축약 === */
.header.scrolled .top-bar {
  padding: 12px 40px;
  border-bottom: none;
}

.header.scrolled .logo {
  font-size: 24px;
}

/* 스크롤 시: 하단 메뉴 숨김 */
.header.scrolled .main-nav {
  display: none;
}

/* 스크롤 시: 중앙 인라인 메뉴 표시 */
.header.scrolled .main-nav-inline {
  display: flex;
}

.header.scrolled .main-nav-inline .main-nav-link {
  font-size: 14px;
}

.header.scrolled .top-nav {
  gap: 15px;
}

@media (max-width: 1024px) {
  .top-bar {
    padding: 15px 30px;
  }

  .logo {
    font-size: 28px;
  }

  .top-nav {
    gap: 15px;
  }

  .nav-link {
    font-size: 13px;
  }

  .search-input {
    width: 100px;
  }

  .main-nav {
    gap: 25px;
    padding: 15px 30px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .main-nav-link {
    font-size: 14px;
  }

  .header.scrolled .main-nav-inline {
    gap: 20px;
  }

  .header.scrolled .main-nav-inline .main-nav-link {
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .top-bar {
    padding: 15px 20px;
    position: relative;
  }

  .logo {
    font-size: 24px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .main-nav-inline {
    display: none !important;
  }

  .mobile-menu-btn {
    display: block;
    background: none;
    border: none;
    font-size: 28px;
    cursor: pointer;
    color: #333;
    padding: 0;
    z-index: 10;
  }

  .top-nav {
    display: none;
    position: fixed;
    top: 71px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    gap: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-height: calc(100vh - 71px);
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .top-nav::-webkit-scrollbar {
    display: none;
  }

  .top-nav.mobile-open {
    display: flex;
  }

  .mobile-main-menu {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  .mobile-main-link {
    color: #333;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    padding: 8px 0;
  }

  .mobile-main-link:hover {
    color: #ffd700;
  }

  .mobile-main-link:last-child {
    margin-bottom: 10px;
    padding-bottom: 18px;
    border-bottom: 1px solid #ddd;
  }

  .menu-divider {
    display: none;
  }

  .nav-link {
    font-size: 16px;
    padding: 8px 0;
    width: 100%;
  }

  .divider {
    display: none;
  }

  .search-btn {
    width: 100%;
    justify-content: flex-start;
  }

  .search-input {
    width: 100%;
    font-size: 16px;
    padding: 8px 0;
  }

  .cart-badge {
    right: -15px;
  }

  .main-nav {
    display: none;
  }
}

@media (max-width: 480px) {
  .logo {
    font-size: 20px;
  }

  .main-nav {
    gap: 15px;
    padding: 12px 15px;
  }

  .main-nav-link {
    font-size: 12px;
  }
}
</style>