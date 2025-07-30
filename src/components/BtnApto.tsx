import { useState } from 'react'
import Input from './Input'

export default function BtnApto () {
  const [active, setActive] = useState<string | null>(null);

  const apartments = {
    201: 1,
    202: 2,
    301: 3,
    302: 2,
  }

  return (
    <section className='form_change'>
      {
       Object.entries(apartments).map(([apartment, people]) => (
        <div key={apartment} className="form_change_apto">
          <button id={apartment} type="button" onClick= {() => (
            active === apartment ? setActive(null) :
            setActive(apartment))}>
            {`Apto ${apartment} total inquilinos tiempo completo: ${people}`}
          </button>
          <div className={`form_change_info${active === apartment ? 'active' : ''}`} id={`divInfo${apartment}`}>
            <Input name={`inputFullTime${apartment}`} type="number" placeholder={people} value={people}> 
              Numero de inquilinos que estuvieron tiempo completo
            </Input>
            <Input name={`inputPartTime${apartment}`} type="number" placeholder={0} value={0}> 
              Numero de inquilinos que estuvieron tiempo completo
            </Input>
            <div className='btn-apto-input-date'>
              <Input type='date' name={`dateApto${apartment}`}>
                Fecha de inicio
              </Input>
              <Input type='date' name={`dateEndApto${apartment}`}>
                Fecha de fin
              </Input>
            </div>
            <div className="form_change_info-radio">
              <label> Vacaciones 
                <input type="radio" name={`inputOptions${apartment}`} value="vacation"/>
              </label>
              <label> Visita
                <input type="radio" name={`inputOptions${apartment}`} value="visit"/>
              </label> 
            </div> 
          </div>
        </div>
        ))
      }
      
    </section>
  )
}
