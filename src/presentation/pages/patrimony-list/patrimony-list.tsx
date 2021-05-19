import './patrimony-list-styles.css'
import { Header, FormContext, ComboOptions, LoadContext } from '@/presentation/components'
import {
  Item,
  Form,
  ButtonNew,
  ItemProps,
  Error,
  Loading,
  Pagination
} from '@/presentation/pages/patrimony-list/components'
import { useErrorHandler } from '@/presentation/hooks'
import {
  DeletePatrimony,
  LoadCategories,
  LoadOwners,
  LoadPatrimonies,
  LoadPatrimoniesByCategoryId,
  LoadPatrimoniesByOwnerId,
  LoadPatrimonyByNumber
} from '@/domain/usecases'
import { PatrimonyModel } from '@/domain/models'

import React, { useState, useEffect } from 'react'

type Props = {
  loadPatrimonies: LoadPatrimonies
  loadOwners: LoadOwners
  loadCategories: LoadCategories
  loadPatrimoniesByCategoryId: LoadPatrimoniesByCategoryId
  loadPatrimoniesByOwnerId: LoadPatrimoniesByOwnerId
  loadPatrimonyByNumber: LoadPatrimonyByNumber
  deletePatrimony: DeletePatrimony
}

const PatrimonyList: React.FC<Props> = ({
  loadPatrimonies,
  loadOwners,
  loadCategories,
  loadPatrimoniesByCategoryId,
  loadPatrimoniesByOwnerId,
  loadPatrimonyByNumber,
  deletePatrimony
}: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, mainError: error.message, isLoading: false }))
  })
  const [state, setState] = useState({
    isLoading: true,
    openDialog: false,
    mainError: '',
    reload: false,
    number: '',
    category: '',
    categories: [] as ComboOptions[],
    categoryInput: '',
    owner: '',
    owners: [] as ComboOptions[],
    totalPage: 1,
    skip: 0,
    take: 9,
    oldPage: 1,
    currentPage: 1,
    patrimonies: [] as ItemProps[]
  })

  const setPatrimonies = (patrimonies: PatrimonyModel[]): void => {
    setState(old => ({
      ...old,
      isLoading: false,
      mainError: '',
      patrimonies: patrimonies.map((p) => ({
        id: p.id.toString(),
        brand: p.brand,
        number: p.number,
        category: p.category.name,
        owner: p.owner.name,
        sector: p.owner.sector.name
      }))
    }))
  }

  const setPatrimony = (patrimony: PatrimonyModel): void => {
    setState(old => ({
      ...old,
      totalPage: 1,
      mainError: '',
      isLoading: false,
      patrimonies: [{
        id: patrimony.id.toString(),
        number: patrimony.number,
        brand: patrimony.brand,
        category: patrimony.category.name,
        owner: patrimony.owner.name,
        sector: patrimony.owner.sector.name
      }]
    }))
  }

  const handlePatrimonies = (data: any): void => {
    if (data) {
      setPatrimonies(data.model)
      setPagination(data.count)
    } else {
      setNotFound()
    }
  }

  const setReload = (): void => {
    setState(old => ({
      ...old,
      reload: !state.reload,
      mainError: '',
      categoryInput: '',
      number: '',
      currentPage: 1,
      oldPage: 1,
      skip: 0
    }))
  }

  const setNotFound = (): void => {
    setState(old => ({
      ...old,
      isLoading: false,
      patrimonies: [],
      mainError: 'Dados não encontrados'
    }))
  }

  const setPagination = (length: number): void => {
    setState(old => ({
      ...old,
      isLoading: false,
      totalPage: Math.ceil(length / state.take)
    }))
  }

  const setLoading = (): void => {
    setState((old) => ({
      ...old,
      isLoading: true
    }))
  }

  const getPatrimoniesByCategoryId = async (skip: number): Promise<void> => {
    loadPatrimoniesByCategoryId.loadByCategoryId({
      id: Number(state.category),
      skip: skip,
      take: state.take
    })
      .then((data) => handlePatrimonies(data))
      .catch((error) => handleError(error))
  }
  const getPatrimoniesByOwnerId = async (skip: number): Promise<void> => {
    loadPatrimoniesByOwnerId.loadByOwnerId({
      id: Number(state.owner),
      skip: skip,
      take: state.take
    })
      .then((data) => handlePatrimonies(data))
      .catch((error) => handleError(error))
  }

  const setOldPage = (): void => setState(old => ({ ...old, oldPage: state.currentPage }))

  const setResetPage = (): void => setState(old => ({ ...old, currentPage: 1, skip: 0 }))

  const isChangeCurrentPage = (): boolean => state.currentPage !== state.oldPage

  const fieldsIsEmpty = (): boolean => {
    if (!state.category && !state.owner && !state.number) {
      return true
    }
  }

  useEffect(() => {
    setLoading()
    loadOwners.load({})
      .then(data => {
        if (data) {
          setState(old => ({
            ...old,
            isLoading: false,
            owners: data.model.map(owner => ({ value: owner.id.toString(), label: owner.name }))
          }))
        } else {
          setNotFound()
        }
      })
      .catch(error => handleError(error))
  }, [state.reload])

  useEffect(() => {
    setLoading()
    loadCategories.load({})
      .then(data => {
        if (data) {
          setState(old => ({
            ...old,
            isLoading: false,
            categories: data.model.map(category => ({ value: category.id.toString(), label: category.name }))
          }))
        } else {
          setNotFound()
        }
      })
      .catch(error => handleError(error))
  }, [state.reload])

  useEffect(() => {
    setLoading()
    setOldPage()
    if (fieldsIsEmpty()) {
      loadPatrimonies.load({ skip: state.skip, take: state.take })
        .then((data) => handlePatrimonies(data))
        .catch((error) => handleError(error))
    }
  }, [state.currentPage, state.reload])

  useEffect(() => {
    setLoading()
    if (state.category) {
      // Caso oldPage não mudar quer dizer que somente a categoria mudou
      // Logo a pagina atual não sofreu alteração
      // Então é carregado a nova categoria partindo da primeira pagina
      if (isChangeCurrentPage()) {
        setOldPage()
        getPatrimoniesByCategoryId(state.skip)
      } else {
        getPatrimoniesByCategoryId(0)
        setResetPage()
      }
    }
  }, [state.category, state.currentPage])

  useEffect(() => {
    setLoading()
    if (state.owner) {
      if (isChangeCurrentPage()) {
        setOldPage()
        getPatrimoniesByOwnerId(state.skip)
      } else {
        setResetPage()
        getPatrimoniesByOwnerId(0)
      }
    }
  }, [state.owner, state.currentPage])

  useEffect(() => {
    setLoading()
    if (state.number) {
      loadPatrimonyByNumber.loadByNumber({ number: state.number })
        .then((patrimony) => { if (patrimony) setPatrimony(patrimony) })
        .catch(error => handleError(error))
    }
  }, [state.number])

  useEffect(() => {
    if (fieldsIsEmpty()) setReload()
  }, [state.category, state.number, state.owner])

  const handleDelete = (id: number): void => {
    deletePatrimony.delete({ id: id })
      .then(() => {
        setReload()
      })
      .catch(error => handleError(error))
  }

  return (
    <div className="patrimony-list-wrap" data-testid="patrimonies">
      <Header title="Patrimônios" />
      <div className="container patrimony-list-content">
        <LoadContext.Provider value={{ state, setState }}>
          <div className="row gy-4">
            <FormContext.Provider value={{ state, setState }}>
              <Form />
            </FormContext.Provider>
            <ButtonNew />
            {state.isLoading && <Loading />}
            {state.mainError && <Error />}
            {state.patrimonies.map((patrimony) => (
              <Item
                handleDelete={handleDelete}
                patrimony={patrimony}
                key={patrimony.id}
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

export default PatrimonyList
