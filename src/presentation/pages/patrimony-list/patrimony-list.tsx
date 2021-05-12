import { DashboardContext, Header, DashBoard } from '@/presentation/components'
import './patrimony-list-styles.css'

import React, { useState } from 'react'

const PatrimonyList: React.FC = () => {
  const [state, setState] = useState({
    openDashboard: true
  })

  return (
    <div className="patrimony-list-wrap">
      <DashboardContext.Provider value={{ state, setState }}>
        <Header title="Buscar Patrimônio" />
        <DashBoard />
      </DashboardContext.Provider>
      <div className="div patrimony-items-wrap">
        <div className="patrimony-item-wrap">
          <div className="patrimony-item-body">
            <h5>86521</h5>
            <p>Computador: Dell</p>
            <p>Proprietário: Vinicius</p>
            <p>Setor: UPA</p>
            <a href="#">Editar</a>
            <a href="#">Excluir</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatrimonyList
