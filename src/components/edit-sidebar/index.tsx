import { useEditStore } from '@/src/store/editStore'
import { Input, Group, Text } from '@mantine/core'
import React from 'react'
import EditCanvas from './edit-canvas'
import EditComponent from './edit-component'
import EditMutiComponents from './edit-muti-components'

// 编辑画布属性
// 编辑单个组件属性
// 编辑多个组件属性
const EditSidebar = () => {
  const { canvas, selectedComponents } = useEditStore()
  const index = [...selectedComponents][0]
  const component = canvas.components[index]

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center bg-gray-400 p-2 font-semibold">
        画布属性
      </div>
      {selectedComponents.size === 0 ? (
        <EditCanvas canvas={canvas} />
      ) : selectedComponents.size === 1 ? (
        <EditComponent component={component} />
      ) : (
        <EditMutiComponents />
      )}
    </div>
  )
}

export default EditSidebar