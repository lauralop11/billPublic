interface Props {
  fields: Record<string, string | number>;
}

export function Calculation ( {fields}: Props) {
  if(!fields) return null;

  const newFields = Object.values(fields);
  const valueBill = newFields[0].replace('.','');
  
  const operation = parseInt(parseFloat(valueBill) / Number(newFields[1]));
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
  if(!fields) return null;
  const arrayAptos = ['201', '202', '301', '302']
  const newFields = Object.entries(fields);
  const valueBill = newFields.filter(([key, value]) => key === 'inputBill')
  const valueBillString = valueBill[0][1].replace('.','');

  const arraydateBill = newFields.filter(([key, value]) => key.startsWith('dateBill') && value !== '' && value !== '0')
  const dateEndBill = new Date (arraydateBill[1][1]);
  const dateStartBill = new Date (arraydateBill[0][1]);
  const daysBill = parseFloat((dateEndBill - dateStartBill) / (1000 * 60 * 60 * 24) + 1); //milisegundo, segundos, minutos,horas => valores por un dia
  

  const aptos = arrayAptos.map((number)=> {
    const apto = newFields.filter(([key, value]) => (key.includes(number)) && value !== '')

    const objectApto = apto.reduce((acc, item)=> {
      acc.id = number;
      if (item[0].includes('FullTime')){acc.fullTime = (Number(item[1]) * daysBill)};
      if (item[0].includes('FullTime')){acc.TenantfullTime = Number(item[1])};
      if (item[0].includes('PartTime')) {acc.partTime = Number(item[1])};
      if (item[0].includes('Options')) {acc.options = (item[1])};
      if (item[0].includes('dateApto')) acc.dateStart = (new Date (item[1]));
      if (item[0].includes('dateEndApto')) acc.dateEnd = (new Date (item[1]));
     return acc
    },{} ); 

  if(objectApto.options === 'vacation'){
    const daysAptoChange = parseFloat((objectApto.dateEnd - objectApto.dateStart) / (1000 * 60 * 60 * 24) + 1);
    const totalDaysChange = objectApto.partTime * daysAptoChange
    objectApto.totalDaysApto = parseFloat(daysBill - totalDaysChange) + objectApto.fullTime ;
  } else if (objectApto.options === 'visit'){
      const daysAptoChange = parseFloat((objectApto.dateEnd - objectApto.dateStart) / (1000 * 60 * 60 * 24) + 1);
      const totalDaysChange = objectApto.partTime * daysAptoChange
      objectApto.totalDaysApto = parseFloat(objectApto.fullTime + totalDaysChange);
  } else {
    objectApto.totalDaysApto = objectApto.fullTime;
  }
  return objectApto;
  })

  const totalDays = aptos.reduce((acc, item) => acc + item.totalDaysApto, 0)
  const valueForDaysBill = parseFloat(valueBillString) / totalDays;

  const totalForApto = aptos.map((apto) => {
    const total = parseInt(apto.totalDaysApto * valueForDaysBill)
    const totalArray = total.toString().split('').reverse()
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