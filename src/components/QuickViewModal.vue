<script setup>
import { onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  // 모달 표시 여부
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

// 모달 닫기 함수
const closeModal = () => {
  emit("close");
};

// Esc 키를 눌렀을 때 모달을 닫는 핸들러
const handleKeydown = (event) => {
  if (props.isVisible && event.key === "Escape") {
    closeModal();
  }
};

// isVisible prop이 변경될 때마다 body 스크롤을 제어
watch(
  () => props.isVisible,
  (newVal) => {
    // HomeView.vue에서 이미 처리하고 있지만, 여기서도 안전하게 처리합니다.
    document.body.style.overflow = newVal ? "hidden" : "";
  },
  { immediate: true }
);

onMounted(() => {
  // 컴포넌트 마운트 시 Esc 키 이벤트 리스너 등록
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  // 컴포넌트 언마운트 시 이벤트 리스너 제거 및 스크롤 복원
  document.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <transition name="modal-fade">
    <div v-if="isVisible" class="modal-backdrop" @click.self="closeModal">
      <div class="modal-content-wrapper">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* ----------------------------------
 * 1. Modal Backdrop & Layout
 * ---------------------------------- */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 배경 색상 투명도 조정 (이미지처럼 약간 더 밝게) */
  background-color: rgba(0, 0, 0, 0.5); /* 0.7에서 0.5로 변경 */
  z-index: 1000;

  /* 콘텐츠 중앙 정렬을 위한 Flex */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 모달이 화면보다 클 때 스크롤 가능하도록 설정 */
  overflow-y: auto;
  padding: 40px 20px;
}

.modal-content-wrapper {
  /* 모달의 최대 너비를 설정하여 너무 커지는 것을 방지 */
  max-width: 1200px;
  width: 100%;

  /* 배경에 띄울 모달 본체 스타일 */
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

  /* HomeView에서 isQuickView="true"를 전달받은 ProductDetail.vue가 들어갈 공간 */
  /* ProductDetail의 margin-top: 140px 스타일을 무력화하기 위해 내부 패딩을 0으로 덮습니다. */
}

/* ----------------------------------
 * 2. Transition (애니메이션)
 * ---------------------------------- */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* 콘텐츠 등장/사라짐 애니메이션 (선택 사항) */
.modal-fade-enter-active .modal-content-wrapper,
.modal-fade-leave-active .modal-content-wrapper {
  transition: transform 0.3s ease;
}

.modal-fade-enter-from .modal-content-wrapper,
.modal-fade-leave-to .modal-content-wrapper {
  transform: translateY(-50px);
}

/* ----------------------------------
 * 3. Responsive (반응형)
 * ---------------------------------- */
@media (max-width: 768px) {
  .modal-content-wrapper {
    /* 모바일에서는 화면을 꽉 채우도록 설정 */
    border-radius: 0;
    max-width: 100%;
    min-height: 100%;
    margin: 0;
    /* 모바일 퀵뷰에서 발생하는 내부 패딩 문제 해결을 위해 */
    overflow-y: auto;
  }
  .modal-backdrop {
    padding: 0;
    align-items: flex-start; /* 상단에서 시작하도록 변경 */
  }
}
</style>
