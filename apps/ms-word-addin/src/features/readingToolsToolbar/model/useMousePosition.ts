import { ref, onMounted, onUnmounted } from 'vue'

export function useMousePosition() {
  const clientY = ref(0)

  const mouseMoveHandler = (event: MouseEvent) => (clientY.value = event.clientY)

  onMounted(() => {
    document.addEventListener('mousemove', mouseMoveHandler)
  })
  onUnmounted(() => {
    document.removeEventListener('mousemove', mouseMoveHandler)
  })

  return { clientY }
}
