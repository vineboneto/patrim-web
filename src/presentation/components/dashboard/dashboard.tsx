import './dashboard-styles.css'
import { Item } from '@/presentation/components/dashboard/components'
import { DashboardContext } from '@/presentation/components'

import React, { useContext } from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'

const DashBoard: React.FC = () => {
  const { state } = useContext(DashboardContext)
  const optionsMenu = [
    { text: 'Patrimônio', link: 'patrimonies' },
    { text: 'Setor', link: 'sectors' },
    { text: 'Proprietário', link: 'owners' },
    { text: 'Categoria', link: 'categories' }
  ]

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
        {optionsMenu.map((option) => (
          <Item key={option.text} text={option.text} link={option.link} />
        ))}
      </List> }
    </Drawer>
  )
}

export default DashBoard
