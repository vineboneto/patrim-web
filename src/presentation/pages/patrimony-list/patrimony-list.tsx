import { DashboardContext, Header, DashBoard } from '@/presentation/components'

import React, { useState } from 'react'

const PatrimonyList: React.FC = () => {
  const [state, setState] = useState({
    openDashboard: true
  })

  return (
    <DashboardContext.Provider value={{ state, setState }}>
      <Header title="Buscar Patrimônio" />
      <DashBoard />
    </DashboardContext.Provider>
  )
}

export default PatrimonyList
