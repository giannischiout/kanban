import {useCallback, useMemo, useState} from "react";


export function usePopover() {
	const [open, setOpen] = useState(false);

	const onOpen = useCallback(() => {
		setOpen(true)
	}, [])
	const onClose = useCallback(() => {
		setOpen(false)
	}, [])


	const toggle = useCallback((value: boolean) => {
		setOpen(!value)
	}, [])

	return useMemo(() => ({
		open,
		onOpen,
		onClose,
		toggle,
	}), [open, onOpen, onClose, toggle])
}