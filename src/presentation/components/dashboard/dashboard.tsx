import './dashboard-styles.css'
import { ItemMenu, SubItemsMenu, ItemLink } from '@/presentation/components/dashboard/components'
import { DashboardContext, DashboardMenuContext, List, Divider } from '@/presentation/components'

import React, { useContext, useState } from 'react'
import Drawer from '@material-ui/core/Drawer'

export const optionsMenu = [{
  text: 'Patrimônio',
  name: 'Patrimony',
  subMenu: [{
    text: 'Novo',
    link: '/patrimonies/new'
  },{
    text: 'Buscar',
    link: '/patrimonies'
  }]
}, {
  text: 'Proprietário',
  name: 'Owner',
  subMenu: [{
    text: 'Novo',
    link: '/owners/new'
  },{
    text: 'Buscar',
    link: '/owners'
  }]
}, {
  text: 'Setor',
  name: 'Sector',
  subMenu: [{
    text: 'Novo',
    link: '/sectors/new'
  },{
    text: 'Buscar',
    link: '/sectors'
  }]
}, {
  text: 'Categoria',
  name: 'Category',
  subMenu: [{
    text: 'Novo',
    link: '/categories/new'
  },{
    text: 'Buscar',
    link: '/categories'
  }]
}]

const DashBoard: React.FC = () => {
  const { state } = useContext(DashboardContext)
  const [state_, setState_] = useState({
    openMenuPatrimony: false,
    openMenuCategory: false,
    openMenuOwner: false,
    openMenuSector: false
  })

  return (
    <Drawer
      open={state.openDashboard}
      anchor="left"
      className="dashboard-wrap"
      variant="persistent"
      data-testid="dashboard"
    >
      { state.openDashboard &&
      <List>
        <DashboardMenuContext.Provider value={{ state_, setState_ }}>
          <ItemLink text="Home" link="/" className="home-logo" data-testid="Home-link" />
          <Divider />
          {optionsMenu.map(menu => (
            <div key={menu.name}>
              <ItemMenu text={menu.text} name={menu.name} />
              <SubItemsMenu name={menu.name} itemLinks={menu.subMenu} />
              <Divider />
            </div>
          ))}
        </DashboardMenuContext.Provider>
      </List> }
    </Drawer>
  )
}

export default DashBoard
