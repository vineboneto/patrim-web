import './item-link-styles.css'
import { ItemText, ItemList } from '@/presentation/components'

import React, { AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

export type ItemLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  text: string
  link: string
}

const DashBoardItem: React.FC<ItemLinkProps> = ({ text, link, ...rest }: ItemLinkProps) => {
  return (
    <Link to={link} data-testid={`${link}-link`} className="item-link-wrap" {...rest}>
      <ItemList>
        <ItemText text={text} />
      </ItemList>
    </Link>
  )
}

export default DashBoardItem
