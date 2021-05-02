import './dashboard-styles.css'
import { Item } from '@/presentation/components/dashboard/components'

import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'

const DashBoard: React.FC = () => {
  const optionsMenu = ['Patrimônio', 'Setor', 'Proprietário', 'Categoria']

  return (
    <Drawer open={true} anchor="left" className="dashboard-wrap" variant="persistent">
      <List>
        {optionsMenu.map((text) => (
          <Item key={text} text={text} />
        ))}
      </List>
    </Drawer>
  )
}

export default DashBoard
