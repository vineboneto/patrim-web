import './dashboard-styles.css'
import { Item } from '@/presentation/components/dashboard/components'
import { DashboardContext } from '@/presentation/components'

import React, { useContext } from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'

const DashBoard: React.FC = () => {
  const { state } = useContext(DashboardContext)
  const optionsMenu = ['Patrimônio', 'Setor', 'Proprietário', 'Categoria']

  return (
    <Drawer
      open={state.openDashboard}
      anchor="left"
      className="dashboard-wrap"
      variant="persistent"
      data-testid="dashboard"
    >
      <List>
        {optionsMenu.map((text) => (
          <Item key={text} text={text} />
        ))}
      </List>
    </Drawer>
  )
}

export default DashBoard
