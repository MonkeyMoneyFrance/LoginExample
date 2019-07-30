import React from 'react'

export default function FormField(props){
  const onChange = (e) => props.onChange({[props.id]:e.target.value})
  let {value,id,label,type} = props
  return (
    <div className={'formField'}>
      <label htmlFor={id}>{label}</label>
      <div>
        <input type={type} id={id} onChange={onChange} value={value}  />
      </div>
    </div>
  )
}
