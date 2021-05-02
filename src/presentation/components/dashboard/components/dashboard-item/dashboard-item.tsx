import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

type Props = {
  text: string
}

const DashBoardItem: React.FC<Props> = ({ text }: Props) => {
  return (
    <ListItem button>
      <ListItemText primary={text} />
    </ListItem>
  )
}

export default DashBoardItem
