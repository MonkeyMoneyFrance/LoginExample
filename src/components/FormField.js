import React from 'react'
import PropTypes from 'prop-types'

function FormField(props){
  const onChange = (e) => props.onChange({[props.id]:e.target.value}); // call parent compoen
  const {value,id,label,type,isError,disabled,required} = props
  return (
    <div className={'formField'}>
      <label htmlFor={id}>{label}</label>
      <div>
        <input
          disabled={disabled} // avoid changing after submit
          className={isError && props.id !== document.activeElement.id ? 'error' : ''}
          autoComplete="on"
          id={id}
          name={id}
          type={type} // email or pass
          required={required} // accessibility
          aria-label={label} // accessibility
          aria-required={(!!required).toString()} // accessibility
          onChange={onChange}
          onBlur={onChange} // needed to trigger event of "focus losed" and change className upper to 'error' if so.
          value={value}
        />
      </div>
    </div>
  )
}
FormField.propTypes = {
  required : PropTypes.bool,
  disabled : PropTypes.bool,
  isError : PropTypes.bool,
  value : PropTypes.string,
  id : PropTypes.string,
  label :  PropTypes.string,
  type : PropTypes.string,
  onChange : PropTypes.func
};
export default FormField
