import ListItem from '@material-ui/core/ListItem'
import React from 'react'

const ItemList: React.FC<any> = (props: any) => {
  return (
    <ListItem button {...props}>{props.children}</ListItem>
  )
}

export default ItemList
