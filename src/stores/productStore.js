import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [
      {
        id: "n1",
        name: "올리브 캐미슬 롬퍼",
        price: 45000,
        originalPrice: 56000,
        discount: 20,
        soldPercentage: 75,
        image: "/assets/item1.jpg",
        images: ["/assets/item1.jpg"],
        code: "NITEM001",
        isNew: true,
        category: "dress",
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
        images: [
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=720",
        ],
        code: "NITEM002",
        isNew: true,
        category: "top",
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
        images: [
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=600&fit=crop",
        ],
        code: "NITEM003",
        isNew: true,
        category: "outer",
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
        images: [
          "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=600&fit=crop",
        ],
        code: "NITEM004",
        isNew: true,
        category: "dress",
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
        images: [
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
        ],
        code: "NITEM005",
        isNew: true,
        category: "bottom",
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
        code: "NITEM006",
        isNew: true,
        category: "top",
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
        code: "NITEM007",
        isNew: true,
        category: "bottom",
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
        code: "NITEM008",
        isNew: true,
        category: "dress",
      },

      {
        id: "t1",
        name: "린넨 와이드 팬츠",
        price: 39000,
        originalPrice: 49000,
        discount: 20,
        soldPercentage: 55,
        image:
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
        ],
        code: "TDY001",
        isNew: false,
        category: "bottom",
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
        code: "TDY002",
        isNew: false,
        category: "top",
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
        code: "TDY003",
        isNew: false,
        category: "bottom",
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
        code: "TDY004",
        isNew: false,
        category: "top",
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
        code: "TDY005",
        isNew: false,
        category: "top",
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
        code: "TDY006",
        isNew: false,
        category: "dress",
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
        code: "TDY007",
        isNew: false,
        category: "bottom",
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
        code: "TDY008",
        isNew: false,
        category: "outer",
      },

      {
        id: "o1",
        name: "아울렛 니트 가디건",
        price: 29000,
        originalPrice: 59000,
        discount: 51,
        soldPercentage: 95,
        image:
          "https://images.unsplash.com/photo-1758981400298-78cd18eb6793?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        code: "OITEM001",
        isNew: false,
        category: "outer",
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
        code: "OITEM002",
        isNew: false,
        category: "outer",
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
        code: "OITEM003",
        isNew: false,
        category: "accessory",
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
        code: "OITEM004",
        isNew: false,
        category: "shoes",
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
        code: "OITEM005",
        isNew: false,
        category: "outer",
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
        code: "OITEM006",
        isNew: false,
        category: "top",
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
        code: "OITEM007",
        isNew: false,
        category: "shoes",
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
        code: "OITEM008",
        isNew: false,
        category: "bottom",
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
    selectedCategory: "all",
    searchQuery: "",
  }),

  getters: {
    cartCount: (state) => state.cart.length,

    cartTotal: (state) => {
      return state.cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },

    cartItemCount: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },

    getProductById: (state) => (id) => {
      return state.products.find((product) => product.id === id);
    },

    featuredProducts: (state) => {
      return state.products.filter((p) =>
        ["n1", "n2", "n3", "n4"].includes(p.id)
      );
    },

    filteredProducts: (state) => {
      let filtered = state.products;

      if (state.selectedCategory !== "all") {
        filtered = filtered.filter(
          (product) => product.category === state.selectedCategory
        );
      }

      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(query)
        );
      }

      return filtered;
    },

    currentBannerData: (state) => {
      return state.banners[state.currentBanner];
    },

    categoryCount: (state) => {
      return {
        all: state.products.length,
        outer: state.products.filter((p) => p.category === "outer").length,
        dress: state.products.filter((p) => p.category === "dress").length,
        top: state.products.filter((p) => p.category === "top").length,
        bottom: state.products.filter((p) => p.category === "bottom").length,
        shoes: state.products.filter((p) => p.category === "shoes").length,
        accessory: state.products.filter((p) => p.category === "accessory")
          .length,
      };
    },
  },

  actions: {
    addToCart(productWithOptions) {
      const uniqueKey = `${productWithOptions.id}-${productWithOptions.color}-${productWithOptions.size}`;
      const existingItem = this.cart.find(
        (item) => item.uniqueKey === uniqueKey
      );

      if (existingItem) {
        existingItem.quantity += productWithOptions.quantity;
      } else {
        this.cart.push({
          ...productWithOptions,
          cartId: Date.now() + Math.random().toString(36).substring(2, 11),
          uniqueKey: uniqueKey,
        });
      }
    },

    removeFromCart(cartItemId) {
      const index = this.cart.findIndex((item) => item.cartId === cartItemId);
      if (index > -1) {
        this.cart.splice(index, 1);
      }
    },

    increaseQuantity(cartItemId) {
      const item = this.cart.find((item) => item.cartId === cartItemId);
      if (item) {
        item.quantity++;
      }
    },

    decreaseQuantity(cartItemId) {
      const item = this.cart.find((item) => item.cartId === cartItemId);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },

    clearCart() {
      this.cart = [];
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
      if (index >= 0 && index < this.banners.length) {
        this.currentBanner = index;
      }
    },

    setCategory(category) {
      this.selectedCategory = category;
    },

    setSearchQuery(query) {
      this.searchQuery = query;
    },

    resetFilters() {
      this.selectedCategory = "all";
      this.searchQuery = "";
    },
  },
});
