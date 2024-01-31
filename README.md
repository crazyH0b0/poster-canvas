## 难点

1、 解决 tailwind 和 mantine 的样式冲突
2、 开始拖拽和结束拖拽 2 个事件分别处于不同组件，如何传递被拖拽组件的信息
3、 如何把组件拖拽到画布，在画布中记录组件被拖放入的位置下标，此时需要注意这里得到的位置下标是相对网页的，但是我们最后需要的是相对画布的位置下标。还需要考虑到元素本身的宽度和高度。假设 item 是正方形，则拖动时鼠标位于 item 的中心则需要减去元素宽/高的一半。也就是说，要将鼠标在元素中的位置设置为元素的中心，需要再减去元素自身宽度和高度的一半。
4、元素的单选和多选
5、编辑区域移动单个或多个组件，多选的时候编辑区域根据组件之间不同的位置，生成一个红框把选中的组件进行框选
6、画布的缩放，一旦画布缩放，组件的大小、拖拽和拖放的距离也需要跟着调整
7、画布缩放的时候使用 transform:scale(zoom / 100)，需要搭配 transformOrigin(50%,0) 使用，不然放大的时候会从中间开始覆盖 header 部分
8、编辑区域拓展为伸缩区域，封装 flex-dots 组件，可以对当前编辑区域的组件的大小进行缩放，伸缩后的组件的宽高不能小于 2px
9、组件伸缩的时候需要考虑,在什么方位的伸缩会改变 top 和 left,计算组件拉伸的位置和宽高的变化,代码中的坐标系规定向上是负方向,需要注意取反
10、双击文本组件触发编辑模式，需要考虑 textarea 的 width 和 height 要与原本的文字 div 保持一致，监听 textarea 的 scrollHeight 改变，也需要修改原本文字 div 的高度。
11、文本组件需要加上 overflow-wrap: break-word，处理溢出文本太长不会断开的问题
12、textarea 换行后文本组件的文字不会换行，需要给文本组件添加 CSS 属性 white-space: pre-wrap; 来使 div 元素保留空白字符和换行符

## 后续优化

1、点击左侧物料添加到画布的时候，避免物料的重新渲染：把 addComponent 放到外部, 不要过度使用 zustand 自定义 hooks

```// 避免物料选项栏重新渲染
export const addComponent = (component: IComponent) => {
  useEditStore.setState((state) => {
    state.canvas.components.push({ ...component, key: crypto.randomUUID() })
  })
}
``

```
