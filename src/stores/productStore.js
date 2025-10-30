import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [
      {
        id: 1,
        name: "올리브 캐미솔 롬퍼",
        price: 45000,
        image: "/assets/item1.jpg",
        category: "outer",
      },
      {
        id: 2,
        name: "화이트 오프숄더 드레스",
        price: 52000,
        image: "/assets/item2.jpg",
        category: "dress",
      },
      {
        id: 3,
        name: "소프트 브이넥 니트 세트",
        price: 89000,
        image: "/assets/item3.jpg",
        category: "outer",
      },
      {
        id: 4,
        name: "내추럴 린넨 스트라이프 원피스",
        price: 48000,
        image: "/assets/item4.jpg",
        category: "dress",
      },
    ],
    banners: [
      {
        id: 1,
        title: "CHECK LOOSE DRESS",
        subtitle: "LORD",
        image: "/assets/banner.png",
      },
      {
        id: 2,
        title: "SUMMER COLLECTION",
        subtitle: "NEW ARRIVAL",
        image:
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=600&fit=crop",
      },
      {
        id: 3,
        title: "MODERN CLASSICS",
        subtitle: "LORD",
        image:
          "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=600&fit=crop",
      },
    ],
    cart: [],
    currentBanner: 0,
    selectedCategory: "all", // 카테고리 필터
    searchQuery: "", // 검색어
  }),

  getters: {
    // 장바구니 아이템 개수
    cartCount: (state) => state.cart.length,

    // 장바구니 총 금액
    cartTotal: (state) => {
      return state.cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },

    // 장바구니 총 아이템 수 (수량 포함)
    cartItemCount: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },

    // 필터링된 상품 목록 (카테고리 + 검색)
    filteredProducts: (state) => {
      let filtered = state.products;

      // 카테고리 필터
      if (state.selectedCategory !== "all") {
        filtered = filtered.filter(
          (product) => product.category === state.selectedCategory
        );
      }

      // 검색 필터
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(query)
        );
      }

      return filtered;
    },

    // 현재 배너
    currentBannerData: (state) => {
      return state.banners[state.currentBanner];
    },

    // 카테고리별 상품 개수
    categoryCount: (state) => {
      return {
        all: state.products.length,
        outer: state.products.filter((p) => p.category === "outer").length,
        dress: state.products.filter((p) => p.category === "dress").length,
      };
    },
  },

  actions: {
    // 장바구니에 추가
    addToCart(product) {
      const existingItem = this.cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },

    // 장바구니에서 제거
    removeFromCart(productId) {
      const index = this.cart.findIndex((item) => item.id === productId);
      if (index > -1) {
        this.cart.splice(index, 1);
      }
    },

    // 장바구니 수량 증가
    increaseQuantity(productId) {
      const item = this.cart.find((item) => item.id === productId);
      if (item) {
        item.quantity++;
      }
    },

    // 장바구니 수량 감소
    decreaseQuantity(productId) {
      const item = this.cart.find((item) => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },

    // 장바구니 비우기
    clearCart() {
      this.cart = [];
    },

    // 다음 배너
    nextBanner() {
      this.currentBanner = (this.currentBanner + 1) % this.banners.length;
    },

    // 이전 배너
    prevBanner() {
      this.currentBanner =
        this.currentBanner === 0
          ? this.banners.length - 1
          : this.currentBanner - 1;
    },

    // 특정 배너로 이동
    setBanner(index) {
      if (index >= 0 && index < this.banners.length) {
        this.currentBanner = index;
      }
    },

    // 카테고리 선택
    setCategory(category) {
      this.selectedCategory = category;
    },

    // 검색어 설정
    setSearchQuery(query) {
      this.searchQuery = query;
    },

    // 필터 초기화
    resetFilters() {
      this.selectedCategory = "all";
      this.searchQuery = "";
    },
  },
});
