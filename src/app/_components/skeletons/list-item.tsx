import { Skeleton } from '@/components/ui/skeleton'

type SkeletonListProps = {
  count: number
  isLoading: boolean
}

export function SkeletonList({ count = 5 }: SkeletonListProps) {
  return Array.from({ length: count }).map((_, index) => <Skeleton key={index} className="w-full p-4" />)
}
