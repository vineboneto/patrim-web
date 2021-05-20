import './sector-list-styles.css'
import { Header, LoadContext, Pagination, Loading, ButtonNew, Error } from '@/presentation/components'

import React, { useState } from 'react'

const SectorList: React.FC = () => {
  const [state, setState] = useState({
    isLoading: true,
    openDialog: false,
    mainError: '',
    reload: false,
    totalPage: 1,
    skip: 0,
    take: 9,
    currentPage: 1
  })

  return (
    <div className="sector-list-wrap" data-testid="sectors">
      <Header title="Setores" />
      <div className="container sector-list-content">
        <LoadContext.Provider value={{ state, setState }}>
          <div className="row gy-4">
            <ButtonNew to="/sectors/new" />
            {state.isLoading && <Loading />}
            {state.mainError && <Error />}
          </div>
          <div className="row">
            <Pagination />
          </div>
        </LoadContext.Provider>
      </div>
    </div>
  )
}

export default SectorList
