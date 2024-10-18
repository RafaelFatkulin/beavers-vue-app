import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useNavigationLinks = () => {
  const router = useRouter()
  const links = ref(
    router
      .getRoutes()
      .filter(item => item.meta.type === 'dashboard')
      .sort((a, b) => {
        if (a.meta.order && b.meta.order) {
          return a.meta.order - b.meta.order
        }
        return 0
      }),
  )

  return { links }
}
