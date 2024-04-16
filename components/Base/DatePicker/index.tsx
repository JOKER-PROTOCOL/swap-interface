import React, { useEffect, useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

const Picker = ({ value, onChange }) => {
  const [date, setDate] = useState({ startDate: '', endDate: '' })
  useEffect(() => setDate({ startDate: value, endDate: value }), [value])

  const handleValueChange = val => {
    console.log('handleValueChange', val)
    setDate(val)
    onChange && onChange(val.startDate)
  }
  return (
    <div>
      <Datepicker
        // primaryColor='black'
        asSingle={true}
        value={date}
        maxDate={new Date()}
        useRange={false}
        onChange={handleValueChange}
      />
    </div>
  )
}

export default Picker
