<script setup>
defineProps({
  cartCount: {
    type: Number,
    default: 0,
  },
});

defineEmits(["show-cart"]);
</script>

<template>
  <header class="header">
    <div class="top-bar">
      <div class="logo">LORD</div>
      <nav class="top-nav">
        <a href="#" class="nav-link">LOGIN</a>
        <span class="divider">|</span>
        <a href="#" class="nav-link">JOIN US</a>
        <span class="divider">|</span>
        <a href="#" class="nav-link">ORDER</a>
        <span class="divider">|</span>
        <a
          href="#"
          class="nav-link cart-link"
          @click.prevent="$emit('show-cart')"
        >
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
  />;
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
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  border-bottom: 1px solid #eee;
}

.logo {
  font-size: 32px;
  font-weight: 700;
  color: #ffd700;
  letter-spacing: 2px;
}

.top-nav {
  display: flex;
  align-items: center;
  gap: 20px;
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
}

.main-nav-link {
  color: #333;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s;
  position: relative;
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
</style>
