import dayjs from 'dayjs'

export function formatDate(date: Date | undefined) {
  if (!Date) return ''
  return dayjs(date).format('DD-MM-YYYY')
}