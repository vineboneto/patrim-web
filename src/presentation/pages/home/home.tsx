import './home-styles.css'
import { Header, DashBoard, DashboardContext } from '@/presentation/components'

import React, { useState } from 'react'

const Home: React.FC = () => {
  const [state, setState] = useState({
    openDashboard: false
  })

  return (
    <div className="home-wrap">
      <DashboardContext.Provider value ={{ state, setState }}>
        <Header />
        <DashBoard />
      </DashboardContext.Provider>
    </div>
  )
}

export default Home
