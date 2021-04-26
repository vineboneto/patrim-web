import React, { InputHTMLAttributes } from 'react'

import './input-styles.css'

type Props = InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className="form-floating input-container">
      <input
        { ...props }
        className="form-control"
        id={`floating-${props.name}`}
        placeholder=" "
      />
      <label
        htmlFor={`floating-${props.name}`}
      >
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input
