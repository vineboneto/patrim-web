import './item-menu-styles.css'
import { DashboardMenuContext, ItemText, ItemList } from '@/presentation/components'

import React, { useContext } from 'react'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

type Props = {
  text: string
  name: string
}

const ItemMenu: React.FC<Props> = ({ text, name }: Props) => {
  const { state_, setState_ } = useContext(DashboardMenuContext)

  const handleOpenMenu = (name: string): void => {
    const menuName = `openMenu${name}`
    setState_(old => ({
      ...old,
      [menuName]: !old[menuName]
    }))
  }

  return (
    <>
      <ItemList onClick={() => handleOpenMenu(name)} className="item-menu-wrap" data-testid={`${name}-menu`}>
        <ItemText text={text} />
        {state_[`openMenu${name}`] ? <ExpandLess /> : <ExpandMore />}
      </ItemList>
    </>
  )
}

export default ItemMenu
