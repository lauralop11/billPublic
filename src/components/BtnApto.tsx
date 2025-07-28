import { useState } from 'react'
import Input from './Input'

export default function BtnApto () {
  const [active, setActive] = useState<string | null>(null);
  const [options, setOptions] = useState<string>('');

  const apartments = {
    201: 1,
    202: 2,
    301: 3,
    302: 2,
  }

  return (
    <section className='btn-apto'>
      {
       Object.entries(apartments).map(([apartment, people]) => (
        <div key={apartment}>
          <button id={apartment}  onClick= {() => (
            active === apartment ? setActive(null) :
            setActive(apartment))}>
              {apartment}
          </button>
          <div className={`div-info-apto ${active === apartment ? 'active' : ''}`} id={`divInfo${apartment}`}>
            <Input name={`inputFullTime${apartment}`} className="input-info-apto" type="number" placeholder={people} defaultValue={people}> 
              Numero de inquilinos que estuvieron tiempo completo
            </Input>
            <Input name={`inputPartTime${apartment}`} className="input-info-apto" type="number" placeholder={0} defaultValue={0}> 
              Numero de inquilinos que estuvieron tiempo completo
            </Input>
           <div className='btn-apto-input-date'>
              <Input type='date' name='dateAptoDate' placeholder='2024-10-01'>
                Fecha de inicio
              </Input>
              <Input type='date' name='dateDateEnd' placeholder='2024-11-01'>
                Fecha de fin
              </Input>
            </div>
            <div>
              <label> Vacaciones 
                <input type="radio" className="input-info-apto" name="inputOptions" onChange={() => setOptions('holidays')}/>
              </label>
              <label> Visita
                <input type="radio" className="input-info-apto" name="inputOptions" onChange={() => setOptions('visit')}/>
              </label> 
            </div> 
          </div>
        </div>
        ))
      }
      
    </section>
  )
}
