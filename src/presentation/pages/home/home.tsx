import './home-styles.css'
import { Header, DashBoard } from '@/presentation/components'

import React from 'react'

const Home: React.FC = () => {
  return (
    <div className="home-wrap">
      <Header />
      <DashBoard />
    </div>
  )
}

export default Home
