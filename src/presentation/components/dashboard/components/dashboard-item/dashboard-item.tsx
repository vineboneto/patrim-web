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
    <Link replace to={link} data-testid={`${link}-link`} className="item-wrap">
      <ListItem button>
          <ListItemText primary={text} />
      </ListItem>
    </Link>
  )
}

export default DashBoardItem
