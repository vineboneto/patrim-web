import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'

export type ItemProps = {
  value: string
  label: string
}

const Item: React.FC<ItemProps> = ({ label, value }: ItemProps) => {
  return (
    <MenuItem value={value}>
      {label === 'None' ? <em>None</em> : label }
    </MenuItem>
  )
}

export default Item
