import { Flag } from 'lucide-react'

type PriorityProps = {
  status: string
}

export function Priority({ status }: PriorityProps) {
  const { text, background, border } = getColor(status)
  const statusCap = `${status.charAt(0).toUpperCase()}${status.slice(1)}`
  return (
    <div
      className="size py-0.2 flex flex-row items-center gap-0.5 rounded px-1"
      style={{
        backgroundColor: background,
        border: `1px solid ${border}`,
      }}
    >
      <Flag style={{ color: text }} size={9} strokeWidth={4} />
      <span className="text-[0.69rem] tracking-wider" style={{ color: text }}>
        {statusCap}
      </span>
    </div>
  )
}

const getColor = (priority: string): { background: string; text: string; border: string } => {
  switch (priority) {
    case 'high':
      return {
        background: 'rgba(246,63,63,0.07)',
        border: 'rgba(246,63,63,0.16)',
        text: 'rgba(246,63,63,0.64)',
      }
    case 'medium':
      return {
        background: 'rgba(241,141,14,0.05)',
        border: 'rgba(246,154,39,0.1)',
        text: 'rgba(185,107,7,0.56)',
      }
    case 'low':
      return {
        background: 'rgba(18,183,87,0.11)',
        border: 'rgba(18,183,87,0.17)',
        text: 'rgba(18,183,87,0.62)',
      }
    default:
      return {
        background: 'rgba(241,241,241,0.74)',
        border: 'rgba(241,241,241,0.74)',
        text: '#535252',
      }
  }
}
