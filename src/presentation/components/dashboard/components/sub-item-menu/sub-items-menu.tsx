import './sub-items-menu-styles.css'
import { ItemLink, ItemLinkProps } from '@/presentation/components/dashboard/components'
import { DashboardMenuContext, List } from '@/presentation/components'

import React, { useContext } from 'react'
import Collapse from '@material-ui/core/Collapse'

type Props = {
  name: string
  itemLinks: ItemLinkProps[]
}

const SubItemsMenu: React.FC<Props> = ({ name, itemLinks }: Props) => {
  const { state_ } = useContext(DashboardMenuContext)

  return (
    <Collapse in={state_[`openMenu${name}`]} timeout="auto" unmountOnExit>
      <List disablePadding className="sub-items-wrap">
        {itemLinks.map((item, index) => (
          <div key={item.text}>
            <ItemLink key={item.text} text={item.text} link={item.link} />
          </div>
        ))}
      </List>
    </Collapse>
  )
}

export default SubItemsMenu
