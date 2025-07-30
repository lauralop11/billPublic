import Input from './Input';
import SctDate from './SctDate';
import { useInputChange } from '../hooks/useInputChange';

export default function SctInitial () {
  const { checked, handleChange } = useInputChange();

  return (
    <section className='form_initial'>
      <Input type='number' name='inputBill' placeholder='240.000'> 
        Valor del recibo publico
      </Input>
      <Input type='number' name='inputPeople' placeholder='8'>
        Total de inquilinos en la casa tiempo completo
      </Input>
      <Input type='checkbox' name='inputChangePeople' onChange={handleChange}>
      Hubo <span className="text">visita</span> o alguien se fue de <span className="text">vacaciones</span> en el mes?
      </Input>
      {checked && <SctDate /> }
    </section>
  )
}