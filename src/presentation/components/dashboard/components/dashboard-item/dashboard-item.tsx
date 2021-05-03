import './dashboard-item-styles.css'

import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'

type Props = {
  text: string
  link: string
}

const DashBoardItem: React.FC<Props> = ({ text, link }: Props) => {
  return (
    <ListItem button className="item-wrap">
      <Link replace to={link} data-testid={`${link}-link`}>
        <ListItemText primary={text} />
      </Link>
    </ListItem>
  )
}

export default DashBoardItem
