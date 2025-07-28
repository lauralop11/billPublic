import SctInitial from './SctInitial';
import { useHandleChange } from '../hooks/useInputChange';
import Calculation from './Calculation';

export default function Form () {

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = Object.fromEntries(new window.FormData(e.currentTarget));
    Calculation(fields);
  }
  return (
    <form onSubmit={ submit }>
      <SctInitial />
      <button className='btnSum' type='submit'>Calcular</button>
    </form>
    
  )
}