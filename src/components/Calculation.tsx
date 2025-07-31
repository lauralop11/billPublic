interface Props {
  fields: Record<string, string | number | File>;
}
interface AptoData {
  id?: number;
  fullTime?: number;
  TenantfullTime?: number;
  partTime?: number;
  options?: string;
  dateStart?: Date;
  dateEnd?: Date;
  totalDaysApto?: number;
  totalValueForApto?: string;
}

export function Calculation ( {fields}: Props) {
  if(Object.keys(fields).length === 0) return null;
  
  const valueBill = fields.inputBill.replace('.','');
  const people = Number(fields.inputPeople)
  const operation = Math.ceil(parseFloat(valueBill) / people);

  const array = operation.toString().split('').reverse()
  const resultArray = []
  for (let i = 0; i < array.length ; i++){
    if (i > 0 && i % 3 === 0) {
      resultArray.push('.');
    }
    resultArray.push(array[i]);
  }
  const result = resultArray.reverse().join('');
  return (
    <div className='result'>
      <h2>Resultado</h2>
      <p>Total a pagar por persona: ${result}</p>
    </div>
  )
}

export function CalculationWithOptions({fields}: Props) {
  if(Object.keys(fields).length === 0) return null;
  const arrayAptos = ['201', '202', '301', '302']
  
  const newFields = Object.entries(fields); //convierte fields (objetos) a un array.
  
  const valueBill = fields.inputBill.toString().replace('.','');

  let daysBill: number;
  if (fields.dateBill && fields.dateBillEnd) {
    const dateEndBill = new Date (fields.dateBill);
    const dateStartBill = new Date (fields.dateBillEnd);
     daysBill = Math.ceil((dateEndBill.getTime() - dateStartBill.getTime()) / (1000 * 60 * 60 * 24) + 1); //milisegundo, segundos, minutos,horas => valores por un dia
  }

  const aptos = arrayAptos.map((number)=> {
    const apto = newFields.filter(([key, value]) => (key.includes(number)) && value !== '')

    const objectApto = apto.reduce<AptoData>((acc, item)=> {
      acc.id = Number(number);
      if (item[0].includes('FullTime')){acc.fullTime = (Number(item[1]) * daysBill)};
      if (item[0].includes('FullTime')){acc.TenantfullTime = Number(item[1])};
      if (item[0].includes('PartTime')) {acc.partTime = Number(item[1])};
      if (item[0].includes('Options')) {acc.options = (item[1]) as string};
      if (item[0].includes('dateApto')) acc.dateStart = (new Date (item[1]));
      if (item[0].includes('dateEndApto')) acc.dateEnd = (new Date (item[1]) );
     return acc
    },{
      id: 0,
      fullTime: 0,
      partTime: 0,
      TenantfullTime: 0,
      options: '',
      dateStart: new Date(),
      dateEnd: new Date(),
    } ); 

    if ( objectApto.dateEnd && objectApto.dateStart && objectApto.partTime){
      const daysAptoChange = Math.ceil(objectApto.dateEnd?.getTime() - objectApto.dateStart.getTime() / (1000 * 60 * 60 * 24) + 1);
      debugger;
      const totalDaysChange = objectApto.partTime * daysAptoChange;
      if (objectApto.options === 'vacation'){
        objectApto.totalDaysApto = (daysBill - totalDaysChange) + (objectApto.fullTime ?? 0) ;
      } 
      if (objectApto.options === 'visit'){
        objectApto.totalDaysApto =(objectApto.fullTime ?? 0) + totalDaysChange;
      }
    } else {
      objectApto.totalDaysApto = (objectApto.fullTime ?? 0);
    }
  return objectApto;
  })

  const totalDays = aptos.reduce((acc, item) => acc + (item.totalDaysApto ?? 0), 0)
  const valueForDaysBill = parseFloat(valueBill) / totalDays;

  aptos.map((apto) => {
    const total = Math.ceil((apto.totalDaysApto ?? 0) * valueForDaysBill);
    const totalArray = total.toString().split('').reverse();
      const resultArray = []
      for (let i = 0; i < totalArray.length ; i++){
        if (i > 0 && i % 3 === 0) {
          resultArray.push('.');
        }
      resultArray.push(totalArray[i]);
    }
    apto.totalValueForApto= resultArray.reverse().join('')
    return apto
  })
  
  return(
    <section className='result'>
      <h2>Total a pagar por Apto</h2>
      {
        aptos.map((apto)=>(
          <div key={apto.id} className='result_info'>
            <p>Apto {apto.id} total a pagar <strong>{apto.totalValueForApto}</strong> </p>
            <p>Total de inquilinos tiempo completo {apto.TenantfullTime}</p>
            <p>Total de inquilinos en {apto.options}: {apto.partTime}</p>
          </div>
        ))
      }
    </section>
  )
}