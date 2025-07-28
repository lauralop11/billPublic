import { useState } from 'react'

export function useInputChange() {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
 console.log('useInputChange', checked)
  return { checked, handleChange }
}

