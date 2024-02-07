import { AppShell, Tooltip } from '@mantine/core'
import { BsFileEarmarkText } from 'react-icons/bs'
import { GiBroom } from 'react-icons/gi'
import { MdOutlinePreview } from 'react-icons/md'
import { TbArrowBack, TbArrowForward } from 'react-icons/tb'
import { unstable_usePrompt, useNavigate } from 'react-router-dom'
import { useCanvasId, useCanvasType } from 'src/hooks/useCanvasIdAndType'
import { FaTrashCan } from 'react-icons/fa6'

import { saveCanvas } from 'src/request/canvas'
import { useEditStore } from 'src/store/editStore'
import { toast } from 'sonner'
import { useZoomStore } from 'src/store/zoom-store'

const CanvasHeader = () => {
  const {
    canvas,
    clearCanvas,
    getNextCanvasHistory,
    getPrevCanvasHistory,
    updateCanvasId,
    setSaveCanvas,
    hasSaved,
  } = useEditStore()
  const { resetZoom } = useZoomStore()
  const navigate = useNavigate()
  const id = useCanvasId()
  const type = useCanvasType()
  unstable_usePrompt({
    when: !hasSaved,
    message: '离开后数据将不会被保存，确认要离开吗？',
  })

  const handleSaveCanvas = async () => {
    const isNew = canvas.id == null
    await saveCanvas(
      {
        id,
        content: JSON.stringify(canvas),
        type: type,
        title: canvas.title,
      },
      (_id) => {
        if (isNew) {
          updateCanvasId(_id)
          navigate(`/edit?id=${_id}`)
        }
        toast.success('保存成功')
        setSaveCanvas(true)
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

  const handleClearCanvas = () => {
    clearCanvas()
    resetZoom()
  }
  return (
    <AppShell.Header px={20} className="bg-primary-black">
      <ul className="text-primary-grey-300 flex h-full  w-full items-center  justify-center gap-3">
        {/* <li className=" cursor-pointer" onClick={() => navigate('/list')}>
          查看列表
        </li> */}
        <Tooltip label="保存">
          <li
            onClick={handleSaveCanvas}
            className="hover:bg-primary-grey-200 group flex  h-full cursor-pointer items-center gap-1 px-2.5 py-5 hover:cursor-pointer "
          >
            <BsFileEarmarkText size={25} className=" " />
          </li>
        </Tooltip>
        <Tooltip label="保存并预览">
          <li
            onClick={handleSaveAndPreview}
            className="hover:bg-primary-grey-200 group flex  h-full cursor-pointer items-center gap-1 px-2.5 py-5 hover:cursor-pointer "
          >
            <MdOutlinePreview size={25} />
            {/* <p onClick={handleSaveAndPreview}>保存并预览</p> */}
          </li>
        </Tooltip>
        <Tooltip label="上一步">
          <li
            onClick={getPrevCanvasHistory}
            className="hover:bg-primary-grey-200 group flex  h-full cursor-pointer items-center gap-1 px-2.5 py-5 hover:cursor-pointer "
          >
            <TbArrowBack size={25} />
            {/* <p>上一步</p> */}
          </li>
        </Tooltip>
        <Tooltip label="下一步">
          <li
            onClick={getNextCanvasHistory}
            className="hover:bg-primary-grey-200 group flex  h-full cursor-pointer items-center gap-1 px-2.5 py-5 hover:cursor-pointer "
          >
            <TbArrowForward size={25} />
          </li>
        </Tooltip>
        <Tooltip label="清空画布">
          <li
            onClick={handleClearCanvas}
            className="hover:bg-primary-grey-200 group flex  h-full cursor-pointer items-center gap-1 px-2.5 py-5 hover:cursor-pointer "
          >
            <FaTrashCan size={20} />
            {/* <p className="group-hover:text-red-500" onClick={handleClearCanvas}>
            清空
          </p> */}
          </li>
        </Tooltip>
      </ul>
    </AppShell.Header>
  )
}

export default CanvasHeader
