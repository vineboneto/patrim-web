import './item-link-styles.css'
import { ItemText, ItemList } from '@/presentation/components'

import React from 'react'
import { Link } from 'react-router-dom'

export type ItemLinkProps = {
  text: string
  link: string
}

const DashBoardItem: React.FC<ItemLinkProps> = ({ text, link }: ItemLinkProps) => {
  return (
    <Link to={link} data-testid={`${link}-link`} className="item-link-wrap">
      <ItemList>
        <ItemText text={text} />
      </ItemList>
    </Link>
  )
}

export default DashBoardItem
