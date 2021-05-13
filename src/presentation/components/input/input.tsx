import { FormContext } from '@/presentation/components'

import React, { ChangeEvent, InputHTMLAttributes, useContext } from 'react'
import TextField from '@material-ui/core/TextField'

type Props = InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)
  const error = state[`${props.name}Error`]
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setState(old => ({ ...old, [e.target.name]: e.target.value }))

  return (
    <div className="input-wrap">
      <TextField
        data-testid={`${props.name}`}
        type={props.type}
        style={{ width: '100%', margin: '10px 0' }}
        name={props.name}
        value={state[`${props.name}`]}
        onChange={handleChange}
        error={error !== undefined}
        title={error}
        variant="outlined"
        label={props.placeholder}
        autoComplete="off"
      />
    </div>
  )
}

export default Input
