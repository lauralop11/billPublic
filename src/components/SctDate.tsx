import Input from './Input';
import BtnApto from './BtnApto';

export default function SctDate () {
  return (
    <section className='form_change'>
      <Input type='date' name='dateBill' placeholder='2024-10-01'>
        Fecha de inicio del periodo de facturacion
      </Input>
      <Input type='date' name='dateBillEnd' placeholder='2024-11-01'>
        Fecha de fin del periodo de facturacion
      </Input>
      <BtnApto />

    </section>
  );
}