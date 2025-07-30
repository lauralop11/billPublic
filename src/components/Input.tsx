interface Props {
  name: string;
  children: string;
  type: string;
  placeholder?: string;
  value?: number | string;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void);
}

export default function Input ({ name, children, type, placeholder, value, onChange }: Props) {
  return (
    <div className='input'>    
      <label > { children } </label>
      <input type={ type } name={ name } placeholder={ placeholder } defaultValue={ value } onChange={onChange}/>
    </div>
    
  )
}