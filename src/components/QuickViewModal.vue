<script setup>
import { onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

const handleKeydown = (event) => {
  if (props.isVisible && event.key === "Escape") {
    closeModal();
  }
};

watch(
  () => props.isVisible,
  (newVal) => {},
  { immediate: true }
);

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div v-if="isVisible" class="modal-backdrop" @click.self="closeModal">
    <div class="modal-content-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.modal-content-wrapper {
  max-width: 1200px;
  width: 100%;
  background-color: white;
  border-radius: 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  max-height: calc(100vh - 80px);
  overflow-y: auto;
}

.modal-content-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.modal-content-wrapper::-webkit-scrollbar-track {
  background: #f0f0f0;
}

.modal-content-wrapper::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}

.modal-content-wrapper::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media (max-width: 768px) {
  .modal-content-wrapper {
    border-radius: 0;
    max-width: 100%;
    min-height: 100%;
    margin: 0;
    overflow-y: auto;
    max-height: 100vh;
  }

  .modal-content-wrapper::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .modal-backdrop {
    padding: 0;
    align-items: flex-start;
    overflow-y: hidden;
  }
}
</style>
