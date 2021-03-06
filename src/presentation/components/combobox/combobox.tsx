import './combobox-styles.css'
import { FormContext } from '@/presentation/components'

import React, { InputHTMLAttributes, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'

export type ComboOptions = {
  value: string
  label: string
}

type Props = InputHTMLAttributes<HTMLInputElement> & {
  options: ComboOptions[]
}

const Combobox: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)
  const error = state[`${props.name}Error`]
  const isLoading = state[`${props.name}IsLoading`]

  const handleChange = (e: any, option: any): void => {
    setState({ ...state, [props.name]: option?.value })
  }

  const handleInputChange = (e: any, value: any): void => {
    setState({ ...state, [`${props.name}Input`]: value })
  }

  return (
    <Autocomplete
      inputValue={state[`${props.name}Input`]}
      onInputChange={handleInputChange}
      onChange={handleChange}
      className="combobox-wrap"
      aria-disabled={props.disabled}
      style={{ margin: '10px 0' }}
      getOptionLabel={(option) => option.label }
      getOptionSelected={(option, value) => option.value === value.value }
      id="controllable-states-demo"
      disabled={props.disabled}
      loading={isLoading}
      options={props.options}
      defaultValue={{ value: '', label: '' }}
      renderInput={(params) =>
        <TextField
          {...params}
          error={error !== undefined}
          data-testid={props.name}
          label={props.placeholder}
          title={error}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />}
    />
  )
}

export default Combobox
