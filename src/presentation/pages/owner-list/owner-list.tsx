import './owner-list-styles.css'
import { Header, LoadContext, Pagination, Loading, ButtonNew, Error } from '@/presentation/components'
import { ItemProps, Item } from '@/presentation/pages/owner-list/components'
import { useErrorHandler } from '@/presentation/hooks'
import { DeleteOwner, LoadOwners } from '@/domain/usecases'

import React, { useState, useEffect } from 'react'
import { OwnerModel } from '@/domain/models'

type Props = {
  loadOwners: LoadOwners
  deleteOwner: DeleteOwner
}

const OwnerList: React.FC<Props> = ({ loadOwners, deleteOwner }: Props) => {
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
    owners: [] as ItemProps[]
  })

  const setOwners = (owners: OwnerModel[]): void => {
    setState(old => ({
      ...old,
      isLoading: false,
      mainError: '',
      owners: owners.map((owner) => ({
        id: owner.id.toString(),
        name: owner.name,
        sector: owner.sector.name
      }))
    }))
  }

  const handleOwners = (data: any): void => {
    if (data) {
      setOwners(data.model)
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
      owners: [],
      mainError: 'Dados não encontrados'
    }))
  }

  const setLoading = (): void => {
    setState((old) => ({
      ...old,
      isLoading: true
    }))
  }

  const setReload = (): void => {
    setState(old => ({
      ...old,
      reload: !state.reload,
      mainError: '',
      currentPage: 1,
      skip: 0
    }))
  }

  useEffect(() => {
    setLoading()
    loadOwners.load({
      skip: state.skip,
      take: state.take
    })
      .then(data => handleOwners(data))
      .catch(error => handleError(error))
  }, [state.currentPage])

  const handleDelete = (id: number): void => {
    deleteOwner.delete({ id: id })
      .then(() => {
        setReload()
      })
      .catch(error => handleError(error))
  }

  return (
    <div className="owner-list-wrap" data-testid="owners">
      <Header title="Proprietários" />
      <div className="container owner-list-content">
        <LoadContext.Provider value={{ state, setState }}>
          <div className="row gy-4">
            <ButtonNew to="/owners/new" />
            {state.isLoading && <Loading />}
            {state.mainError && <Error error={state.mainError} handleReload={setReload} />}
            {state.owners.map((owner) => (
              <Item
                handleDelete={handleDelete}
                owner={owner}
                key={owner.id}
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

export default OwnerList
