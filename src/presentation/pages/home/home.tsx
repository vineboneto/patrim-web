import './home-styles.css'
import { Header, DashBoard, DashboardContext } from '@/presentation/components'

import React, { useState } from 'react'

const Home: React.FC = () => {
  const [state] = useState({
    openDashboard: false
  })

  return (
    <div className="home-wrap">
      <Header />
      <DashboardContext.Provider value ={{ state }}>
        <DashBoard />
      </DashboardContext.Provider>
    </div>
  )
}

export default Home
