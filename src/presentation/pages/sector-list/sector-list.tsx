import './sector-list-styles.css'
import { Header, LoadContext, Pagination, Loading, ButtonNew, Error } from '@/presentation/components'
import { ItemProps, Item } from '@/presentation/pages/sector-list/components'
import { useErrorHandler } from '@/presentation/hooks'
import { LoadSectors } from '@/domain/usecases'

import React, { useState, useEffect } from 'react'
import { SectorModel } from '@/domain/models'

type Props = {
  loadSectors: LoadSectors
}

const SectorList: React.FC<Props> = ({ loadSectors }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, mainError: error.message, isLoading: false }))
  })
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

  const setSectors = (sectors: SectorModel[]): void => {
    setState(old => ({
      ...old,
      isLoading: false,
      mainError: '',
      sectors: sectors.map((sector) => ({
        id: sector.id.toString(),
        name: sector.name
      }))
    }))
  }

  const handleSectors = (data: any): void => {
    if (data) {
      setSectors(data.model)
      setPagination(data.count)
    } else {
      setNotFound()
    }
  }

  const setPagination = (count: number): void => {
    setState(old => ({
      ...old,
      isLoading: false,
      totalPage: Math.ceil(count / state.take)
    }))
  }

  const setNotFound = (): void => {
    setState(old => ({
      ...old,
      isLoading: false,
      sectors: [],
      mainError: 'Dados não encontrados'
    }))
  }

  const setLoading = (): void => {
    setState((old) => ({
      ...old,
      isLoading: true
    }))
  }

  useEffect(() => {
    setLoading()
    loadSectors.load({
      skip: state.skip,
      take: state.take
    })
      .then(data => handleSectors(data))
      .catch(error => handleError(error))
  }, [state.currentPage])

  return (
    <div className="sector-list-wrap" data-testid="sectors">
      <Header title="Setores" />
      <div className="container sector-list-content">
        <LoadContext.Provider value={{ state, setState }}>
          <div className="row gy-4">
            <ButtonNew to="/sectors/new" />
            {state.isLoading && <Loading />}
            {state.mainError && <Error error={state.mainError} handleReload={() => {}} />}
            {state.sectors.map((sector) => (
              <Item
                handleDelete={(id: number) => { console.log('Entrou') } }
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
