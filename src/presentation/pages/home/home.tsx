import './home-styles.css'

import React from 'react'

const DashBoard: React.FC = () => {
  return (
    <div className="home-wrap">
      <header className="header-wrap">
        <span className="dashboard-button">DashBoard</span>
      </header>
      <div className="dashboard-wrap">
        <h1>Somebody</h1>
      </div>
    </div>
  )
}

export default DashBoard
