import './item-text-styles.css'

import React from 'react'
import ListItemText from '@material-ui/core/ListItemText'

type Props = {
  text: string
}

const ItemText: React.FC<Props> = ({ text }: Props) => <ListItemText primary={text} className="item-text-wrap" />

export default ItemText
