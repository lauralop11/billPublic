interface Props {
  fields: Record<string, string | number>;
}

export function Calculation ( {fields}: Props) {
  if(!fields) return null;

  const newFields = Object.values(fields);
  const operation = parseInt(Number(newFields[0]) / Number(newFields[1]));
 
  return (
    <div className='calculation'>
      <h2>El valor por persona a pagar es: {operation}</h2>
    </div>
  )
}

export function CalculationWithOptions({fields}: Props) {
  if(!fields) return null;
  const arrayAptos = ['201', '202', '301', '302']
  const newFields = Object.entries(fields);
  const valueBill = newFields.filter(([key, value]) => key === 'inputBill')

  const arraydateBill = newFields.filter(([key, value]) => key.startsWith('dateBill') && value !== '' && value !== '0')
  const dateEndBill = new Date (arraydateBill[1][1]);
  const dateStartBill = new Date (arraydateBill[0][1]);
  const daysBill = parseFloat((dateEndBill - dateStartBill) / (1000 * 60 * 60 * 24) + 1); //milisegundo, segundos, minutos,horas => valores por un dia
  

  const aptos = arrayAptos.map((number)=> {
    const apto = newFields.filter(([key, value]) => (key.includes(number)) && value !== '')

    const objectApto = apto.reduce((acc, item)=> {
      if (item[0].includes('FullTime')){acc.fullTime = (Number(item[1]) * daysBill)};
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
  const valueForDaysBill = valueBill[0][1] / totalDays;
  const totalValueForApto = aptos.map((apto) => (
    apto.totalValuForApto = parseInt(apto.totalDaysApto * valueForDaysBill)
  ))
  console.log('aptos', aptos)
  console.log('valueBill', valueForDaysBill)
  console.log('valuesBill', totalValueForApto)

}