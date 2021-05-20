import './sector-list-styles.css'
import { Header, LoadContext, Pagination, Loading, ButtonNew, Error } from '@/presentation/components'
import { ItemProps, Item } from '@/presentation/pages/sector-list/components'

import React, { useState, useEffect } from 'react'

const SectorList: React.FC = () => {
  const [state, setState] = useState({
    isLoading: false,
    openDialog: false,
    mainError: '',
    reload: false,
    totalPage: 1,
    skip: 0,
    take: 18,
    currentPage: 1,
    sectors: [] as ItemProps[]
  })

  useEffect(() => {
    setState(old => ({
      ...old,
      sectors: [
        { id: '1', name: 'UPA' },
        { id: '2', name: 'UPA' },
        { id: '3', name: 'UPA' },
        { id: '4', name: 'UPA' },
        { id: '5', name: 'UPA' },
        { id: '6', name: 'UPA' },
        { id: '7', name: 'UPA' },
        { id: '8', name: 'UPA' },
        { id: '9', name: 'UPA' },
        { id: '10', name: 'UPA' },
        { id: '11', name: 'UPA' },
        { id: '12', name: 'UPA' },
        { id: '13', name: 'UPA' },
        { id: '14', name: 'UPA' },
        { id: '15', name: 'UPA' },
        { id: '16', name: 'UPA' },
        { id: '17', name: 'UPA' },
        { id: '18', name: 'UPA' }
      ]
    }))
  }, [])

  return (
    <div className="sector-list-wrap" data-testid="sectors">
      <Header title="Setores" />
      <div className="container sector-list-content">
        <LoadContext.Provider value={{ state, setState }}>
          <div className="row gy-4">
            <ButtonNew to="/sectors/new" />
            {state.isLoading && <Loading />}
            {state.mainError && <Error />}
            {state.sectors.map((sector) => (
              <Item
                handleDelete={(id: number) => { } }
                sector={sector}
                key={sector.id}
              />))}
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
