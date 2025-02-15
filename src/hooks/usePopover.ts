import { useCallback, useEffect, useMemo, useRef, useState} from "react";

export function usePopover() {
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null);

	const onOpen = useCallback(() => {
		setOpen(true)
	}, [])

	const onClose = useCallback(() => {
		setOpen(false)
	}, [])

	const onToggle = useCallback(() => {
		setOpen((prev) => !prev)
	}, [])

	// handle click outside:
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if(ref.current && !ref.current.contains(e.target as Node)) {
				onClose();
			}
		}
		if(open) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [open, onClose])


	return useMemo(() => ({
		open,
		onOpen,
		onClose,
		onToggle,
		setOpen,
		ref
	}), [open, onOpen, onClose, onToggle])
}