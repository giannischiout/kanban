import {useCallback, useMemo, useState} from "react";

export function usePopover() {
	const [open, setOpen] = useState(false);

	const onTrue = useCallback(() => {
		setOpen(true)
	}, [])
	const onFalse = useCallback(() => {
		setOpen(false)
	}, [])
	const toggle = useCallback(() => {
		setOpen((prev) => !prev)
	}, [])
	return useMemo(() => ({
		open,
		onFalse,
		onTrue,
		toggle,
	}), [open, onFalse, onTrue, toggle])
}