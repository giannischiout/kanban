import { useCallback, useMemo, useState } from 'react'

export function useBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const onFalse = useCallback(() => {
    setValue(false)
  }, [setValue])

  const onTrue = useCallback(() => {
    setValue(true)
  }, [setValue])

  const onChange = useCallback(
    (value: boolean) => {
      setValue(value)
    },
    [setValue]
  )

  const onToggle = useCallback(() => {
    setValue((prev) => prev)
  }, [setValue])

  return useMemo(
    () => ({
      onFalse,
      onChange,
      onTrue,
      onToggle,
      value,
    }),
    [value, onTrue, onFalse, onChange, onToggle]
  )
}
