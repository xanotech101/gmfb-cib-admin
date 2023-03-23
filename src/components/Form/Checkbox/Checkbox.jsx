import React from 'react'

export const Checkbox = ({checked,id,title,name,onChange,value}) => {
  return (
    <div className='flex items-center gap-2 mt-2'>
       <input type="checkbox" id={id} checked={checked} name={name} onChange={onChange} value={value}/>
       <label htmlFor={id}>{title}</label>
    </div>
  )
}
