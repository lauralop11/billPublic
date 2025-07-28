export default function Calculation ( fields: Record<string, string | number> ) {
  const newFields = Object.entries(fields);
  const inputs = newFields.filter(([key, value]) => key.startsWith('input') && value !== '');
  console.log('Inputs:', inputs);
  return (
    <div className='result'>
      <h2>Resultados</h2>
    </div>
  )
}