import { ICanvas, IComponent } from 'src/types/editStoreTypes'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'
import { enableMapSet } from 'immer'

enableMapSet()

interface EditStoreState {
  canvas: ICanvas
  setCanvas: (canvas: ICanvas) => void
  clearCanvas: () => void
  addComponent: (component: IComponent) => void
  selectedComponents: Set<number>
  setSelectedComponents: (indexes: number[]) => void
  setSelectedComponent: (index: number) => void
  selectAllComponents: () => void
  updateSelectedComponentsPosition: (position: { top: number; left: number }) => void
}

export const useEditStore = create<EditStoreState>()(
  devtools(
    immer((set) => ({
      canvas: getDefaultCanvas(),
      selectedComponents: new Set(),
      addComponent: (component) =>
        set((state) => {
          state.canvas.components.push({ ...component, key: crypto.randomUUID() })
        }),
      setCanvas: (canvas) =>
        set((state) => {
          state.canvas = canvas
        }),
      // 清空画布
      clearCanvas: () =>
        set((state) => {
          state.canvas = getDefaultCanvas()
          state.selectedComponents = new Set()
        }),
      // 选中单个， 如果 index 为 -1，则取消选中
      setSelectedComponent: (index) =>
        set((state) => {
          if (index > -1) {
            state.selectedComponents = new Set([index])
          }
          if (index === -1) {
            if (state.selectedComponents.size > 0) {
              state.selectedComponents.clear()
            }
          }
        }),
      // 选中多个，如果再次点击已经选中的组件，则取消选中
      setSelectedComponents: (indexes) =>
        set((state) => {
          if (indexes) {
            indexes.forEach((index) => {
              if (state.selectedComponents.has(index)) {
                // 取消选中
                state.selectedComponents.delete(index)
              } else {
                // 选中
                state.selectedComponents.add(index)
              }
            })
          }
        }),

      // 全部选中
      selectAllComponents: () =>
        set((state) => {
          const length = state.canvas.components.length
          state.selectedComponents = new Set(Array.from({ length }, (_, index) => index))
        }),
      updateSelectedComponentsPosition: (position) =>
        set((state) => {
          state.selectedComponents.forEach((index) => {
            const component = state.canvas.components[index]
            for (const i in position) {
              component.style[i] += position[i]
            }
          })
        }),
    })),
  ),
)

// 避免物料选项栏重新渲染
export const addComponent = (component: IComponent) => {
  useEditStore.setState((state) => {
    state.canvas.components.push({ ...component, key: crypto.randomUUID() })
  })
}
function getDefaultCanvas(): ICanvas {
  return {
    title: '未命名',
    // 页面样式
    style: {
      width: 320,
      height: 568,
      backgroundColor: '#ffffff',
      backgroundImage: '',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      boxSizing: 'border-box',
    },
    // 组件
    components: [],
  }
}
