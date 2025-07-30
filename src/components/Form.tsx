import { useState } from 'react';
import SctDate from './SctDate';
import Input from './Input';
import { Calculation, CalculationWithOptions } from './Calculation';
import { useInputChange, useInputOptionsChange } from '../hooks/useInputChange';

export default function Form () {
  const [ active, setActive ] = useState<boolean>(false);
  const [ form, setForm ] = useState(null);
  const { checked, handleChange } = useInputChange();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = Object.fromEntries(new window.FormData(e.currentTarget));
    setForm(fields);
    setActive(true);
  }
  
  return (
    <>
      <form onSubmit={ submit } className='form'>
        <section className='form_initial'>
          <Input type='number' name='inputBill' placeholder='240.000'> 
            Valor del recibo publico
          </Input>
          <div className={`form_initial_people ${checked ? 'hidden' : ''}`}>
            <Input type='number' name='inputPeople' placeholder='8' >
              Total de inquilinos en la casa tiempo completo
            </Input>
          </div>
          <Input type='checkbox' name='inputChangePeople' onChange={handleChange}>
          Hubo <strong>visita</strong> o alguien se fue de <strong>vacaciones</strong> en el mes?
          </Input>
          {checked && <SctDate /> }
        </section>
        <button className='form_btn' type='submit'>Calcular</button>
      </form>
     { active && checked ? <CalculationWithOptions fields={ form } /> : <Calculation fields={ form } />} 
    </>
  )
}