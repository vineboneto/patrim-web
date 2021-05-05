import './select-styles.css'
import { FormContext } from '@/presentation/components'
import { Item, ItemProps } from '@/presentation/components/select/components'

import React, { useContext, SelectHTMLAttributes } from 'react'
import SelectM from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  options: ItemProps[]
}

const Select: React.FC<Props> = (props: Props) => {
  const { state } = useContext(FormContext)
  const error = state[`${props.name}Error`]

  return (
    <div className="select-wrap">
      <FormControl
        variant="outlined"
        style={{ width: '100%', margin: '10px 0' }}
        error={error !== undefined}
      >
        <InputLabel
          id={`${props.name}-labelId`}
        >
          {props.placeholder}
        </InputLabel>
        <SelectM
          data-testid={`${props.name}`}
          error={error !== undefined}
          title={error}
          labelId={`${props.name}-labelId`}
          label={props.placeholder}
          id={`${props.name}-id`}
          defaultValue=""
        >
          <Item value="" label="None" />
          {props.options.map(option => (
            <Item key={option.value} value={option.value} label={option.label} />
          ))}
        </SelectM>
      </FormControl>
    </div>
  )
}

export default Select
