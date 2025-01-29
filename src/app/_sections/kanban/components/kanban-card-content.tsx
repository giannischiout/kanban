export function CardContent({title, description}: {title: string, description: string}) {
	return (
		<div className="py-2.5 px-0.5 flex flex-col gap-0.5 ">
			<p className="select-none tracking-wide">{title}</p>
			<p className="
				text-muted-foreground
				text-sm line-clamp-2
				overflow-hidden
				select-none
				text-[0.84rem]
				font-light
				">{description}</p>
		</div>
	)
}