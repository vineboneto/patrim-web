import React, { SelectHTMLAttributes } from 'react'
import SelectM from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

type Props = SelectHTMLAttributes<HTMLSelectElement>

const Select: React.FC<Props> = (props: Props) => {
  return (
    <div className="select-wrap">
      <FormControl variant="outlined" style={{ width: '100%', margin: '10px 0' }} >
        <InputLabel id={`${props.name}-labelId`}>{props.placeholder}</InputLabel>
        <SelectM
          labelId={`${props.name}-labelId`}
          label={props.placeholder}
          id={`${props.name}-id`}
        >
          <MenuItem value={'Computador'}>Computador</MenuItem>
          <MenuItem value={'Impressora'}>Impressora</MenuItem>
          <MenuItem value={'TV'}>TV</MenuItem>
        </SelectM>
      </FormControl>
    </div>
  )
}

export default Select
