import './input-styles.css'
import { FormContext } from '@/presentation/components'

import React, { ChangeEvent, InputHTMLAttributes, useContext, useRef } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)
  const error = state[`${props.name}Error`]
  const inputRef = useRef<HTMLInputElement>()
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setState(old => ({ ...old, [e.target.name]: e.target.value }))

  return (
    <div
      data-testid={`${props.name}-wrap`}
      data-status={error ? 'invalid' : 'valid'}
      className="form-floating"
    >
      <input
        { ...props }
        ref={inputRef}
        data-testid={props.name}
        title={error}
        id={`floating-${props.name}`}
        className="form-control"
        onChange={handleChange}
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
