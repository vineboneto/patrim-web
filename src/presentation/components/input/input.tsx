import './input-styles.css'

import React, { InputHTMLAttributes, useContext } from 'react'
import { FormContext } from '..'

type Props = InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state } = useContext(FormContext)
  const error = state[`${props.name}Error`]
  return (
    <div
      data-testid={`${props.name}-wrap`}
      data-status={error ? 'invalid' : 'valid'}
      className="form-floating"
    >
      <input
        { ...props }
        data-testid={props.name}
        title={error}
        id={`floating-${props.name}`}
        className="form-control"
        placeholder=" "
      />
      <label
        data-testid={`${props.name}-label`}
        title={error}
        htmlFor={`floating-${props.name}`}
      >
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input
