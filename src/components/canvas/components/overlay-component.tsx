import { useEditStore } from '@/src/store/editStore'
import { CompType } from '@/src/types/const'
import { IComponentWithKey } from '@/src/types/editStoreTypes'
import { Image } from '@mantine/core'
import { pick } from 'lodash'
import React from 'react'
import { TfiText } from 'react-icons/tfi'

const OverlayComponent = ({
  component,
  index,
  style,
}: {
  component: IComponentWithKey
  index: number
  style: React.CSSProperties
}) => {
  const { setSelectedComponent } = useEditStore()
  const handleSetSelectedComponent = () => {
    setSelectedComponent(index)
  }
  let left
  let right
  if (component.type === CompType.IMAGE) {
    left = <Image className="h-8 w-8" src={component.value} fit="fill" alt="" />
    right = '图片'
  }
  if (component.type === CompType.GRAPH) {
    const style = pick(
      component.style,
      'backgroundColor',
      'borderWidth',
      'borderStyle',
      'borderColor',
      'borderRadius',
    )

    left = <div style={style} className="h-6 w-6"></div>
    right = '图形'
  }
  if (component.type === CompType.TEXT) {
    left = <TfiText />
    right = component.value
  }
  return (
    <li
      onClick={handleSetSelectedComponent}
      className="flex  w-full cursor-pointer items-center gap-2 rounded py-1 pl-2 hover:bg-gray-100"
    >
      {left}
      <span className="truncate  text-sm">{right}</span>
    </li>
  )
}

export default OverlayComponent