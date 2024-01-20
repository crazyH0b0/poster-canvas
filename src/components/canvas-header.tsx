import { AppShell } from '@mantine/core'
import { BsFileEarmarkText } from 'react-icons/bs'
import { GiBroom } from 'react-icons/gi'
import { MdOutlinePreview } from 'react-icons/md'
import { TbArrowBack, TbArrowForward } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { useCanvasId, useCanvasType } from 'src/hooks/useCanvasIdAndType'
import { saveCanvas } from 'src/request/canvas'
import { useEditStore } from 'src/store/editStore'
import { toast } from 'sonner'

const CanvasHeader = () => {
  const { canvas, clearCanvas } = useEditStore()
  const navigate = useNavigate()
  const id = useCanvasId()
  const type = useCanvasType()

  const handleSaveCanvas = async () => {
    await saveCanvas(
      {
        id,
        content: JSON.stringify(canvas),
        type: type,
        title: canvas.title,
      },
      (_id) => {
        if (id === null) {
          navigate(`/?id=${_id}`)
        }
        toast.success('保存成功')
      },
    )
  }

  const handleSaveAndPreview = async () => {
    await saveCanvas(
      {
        id,
        content: JSON.stringify(canvas),
        type: type,
        title: canvas.title,
      },
      (_id) => {
        if (id === null) {
          navigate(`/?id=${_id}`)
          toast.success('保存成功')
        }
      },
    )
  }

  return (
    <AppShell.Header px={20}>
      <ul className="flex h-full items-center justify-between gap-3">
        <li className="cursor-pointer hover:text-sky-500">查看列表</li>
        <li className="group flex cursor-pointer items-center gap-1">
          <BsFileEarmarkText size={20} className="group-hover:text-sky-500" />
          <p className="group-hover:text-sky-500" onClick={handleSaveCanvas}>
            保存
          </p>
        </li>
        <li className="group flex cursor-pointer items-center gap-1">
          <MdOutlinePreview size={20} className="group-hover:text-sky-500" />
          <p className="group-hover:text-sky-500" onClick={handleSaveAndPreview}>
            保存并预览
          </p>
        </li>
        <li className="group flex cursor-pointer items-center gap-1">
          <TbArrowBack size={20} className="group-hover:text-sky-500" />
          <p className="group-hover:text-sky-500">上一步</p>
        </li>
        <li className="group flex cursor-pointer items-center gap-1">
          <TbArrowForward size={20} className="group-hover:text-sky-500" />
          <p className="group-hover:text-sky-500">下一步</p>
        </li>
        <li className="group flex cursor-pointer items-center gap-1">
          <GiBroom size={20} className="group-hover:text-red-500" />
          <p className="group-hover:text-red-500" onClick={clearCanvas}>
            清空
          </p>
        </li>
      </ul>
    </AppShell.Header>
  )
}

export default CanvasHeader
