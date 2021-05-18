import './select-styles.css'
import { FormContext } from '@/presentation/components'

import React, { useContext, SelectHTMLAttributes, ChangeEvent } from 'react'
import SelectM from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'

export type ItemProps = {
  value: string
  label: string
}

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  options: ItemProps[]
}

const Select: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)
  const error = state[`${props.name}Error`]
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setState(old => ({ ...old, [e.target.name]: e.target.value }))

  return (
    <div className="select-wrap">
      <FormControl
        variant="outlined"
        style={{ width: '100%', margin: '10px 0' }}
        error={error !== undefined}
      >
        <InputLabel id={`${props.name}-labelId`}>
          {props.placeholder}
        </InputLabel>
        <SelectM
          id={`${props.name}-id`}
          name={props.name}
          data-testid={`${props.name}`}
          error={error !== undefined}
          title={error}
          label={props.placeholder}
          value={state[`${props.name}`] || ''}
          onChange={handleChange}
          defaultValue=""
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {props.options.map(option => (
            <MenuItem key={option.value} value={option.value} data-testid={`${option.label}`}>
              {option.label}
            </MenuItem>
          ))}
        </SelectM>
      </FormControl>
    </div>
  )
}

export default Select
