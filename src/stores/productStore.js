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
  }),

  // getters: state를 기반으로 계산된 값을 반환합니다. (computed 역할)
  getters: {
    cartCount: (state) => state.cart.length,
  },

  // actions: state를 변경하는 모든 메서드를 정의합니다. (함수 역할)
  actions: {
    addToCart(product) {
      const existingItem = this.cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(productId) {
      const index = this.cart.findIndex((item) => item.id === productId);
      if (index > -1) {
        this.cart.splice(index, 1);
      }
    },
    nextBanner() {
      this.currentBanner = (this.currentBanner + 1) % this.banners.length;
    },
    prevBanner() {
      this.currentBanner =
        this.currentBanner === 0
          ? this.banners.length - 1
          : this.currentBanner - 1;
    },
    setBanner(index) {
      this.currentBanner = index;
    },
  },
});
