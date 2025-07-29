import { useState } from 'react'

export function useInputChange() {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  return { checked, handleChange }
}

export function useInputOptionsChange() {
  const [options, setOptions] = useState<string>('nada');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptions(event.target.value)
  }
  return { options, handleChange }
}

