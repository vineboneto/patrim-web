import React from 'react'
import ListM from '@material-ui/core/List'

const List: React.FC<any> = (props: any) => {
  return (
    <ListM {...props}>{props.children}</ListM>
  )
}

export default List
