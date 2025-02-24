import { COLORS } from '@/app/_components/color-picker/COLORS'
import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  color: string
  onChange: (color: string) => void
}
export function ColorPicker({ onChange, color: newColor }: Props) {
  console.log({ newColor })
  const [state, setState] = useState({
    batch: getBatch(COLORS, 0, 22),
    limit: 22,
    page: 0,
  })
  const handleBatch = useCallback(
    (modifier: number) => {
      const batch = getBatch(COLORS, state.page + modifier, state.limit)
      setState((prev) => ({
        ...prev,
        page: prev.page === 0 ? prev.page : prev.page + modifier,
        batch,
      }))
    },
    [state.page, state.limit]
  )

  return (
    <div className="flex w-full flex-wrap gap-2 rounded-md border border-input p-3">
      <div className="grid w-full grid-cols-[repeat(auto-fill,_minmax(1.75rem,_1fr))] gap-1 overflow-auto">
        {state.batch.map((color, index) => (
          <Color key={`${color}-${index}`} onClick={(color) => onChange(color)} hex={color} active={newColor} />
        ))}
      </div>
      <div className="flex gap-1">
        <Button size="icon" onClick={() => handleBatch(0)}>
          <ChevronLeft />
        </Button>
        <Button size="icon" onClick={() => handleBatch(1)}>
          <ChevronRight />
        </Button>
        <div className="border-surface-300 flex h-8 max-w-[120px] items-center overflow-hidden rounded-md border p-1">
          <div className="h-full min-w-[24px] rounded-[4px]" style={{ backgroundColor: newColor || '#2e2e2e' }}></div>
          <input onChange={(e) => onChange(e.target.value)} placeholder="choose color" value={newColor} className="bg-transparent px-2 text-[11px] outline-none" />
        </div>
      </div>
    </div>
  )
}

const Color = ({ hex, onClick, active }: { hex: string; onClick: (color: string) => void; active: string }) => {
  const isActive = active === hex
  return (
    <div
      onClick={() => onClick(hex)}
      className={`h-7 w-7 cursor-pointer rounded border-2 transition-transform duration-300 ease-out hover:scale-[92%] ${isActive ? 'border-red-400' : ''}`}
      style={{ backgroundColor: hex, borderColor: isActive ? 'white' : 'black' }}
    />
  )
}

const getBatch = (data: typeof COLORS, page: number, limit: number) => data.slice(page * limit, (page + 1) * limit)
