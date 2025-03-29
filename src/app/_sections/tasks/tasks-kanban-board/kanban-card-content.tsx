export function CardContent({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-0.5 px-0.5 py-2.5">
      <p className="select-none tracking-wide text-[14px] max-w-[22ch] truncate text-ellipsis ">{title}</p>
      <p className="line-clamp-2 select-none overflow-hidden  text-sm font-light text-gray-500">{description}</p>
    </div>
  )
}
