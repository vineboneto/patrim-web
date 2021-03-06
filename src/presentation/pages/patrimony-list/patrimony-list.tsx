import './patrimony-list-styles.css'
import {
  Header,
  FormContext,
  ComboOptions,
  LoadContext,
  Pagination,
  Loading,
  ButtonNew,
  Error
} from '@/presentation/components'
import {
  Item,
  Form,
  ItemProps
} from '@/presentation/pages/patrimony-list/components'
import { useErrorHandler } from '@/presentation/hooks'
import {
  DeletePatrimony,
  LoadCategories,
  LoadOwners,
  LoadPatrimonies,
  LoadPatrimoniesByCategoryId,
  LoadPatrimoniesByOwnerId,
  LoadPatrimoniesBySectorId,
  LoadPatrimonyByNumber,
  LoadSectors
} from '@/domain/usecases'
import { PatrimonyModel } from '@/domain/models'

import React, { useState, useEffect } from 'react'

type Props = {
  loadPatrimonies: LoadPatrimonies
  loadOwners: LoadOwners
  loadCategories: LoadCategories
  loadSectors: LoadSectors
  loadPatrimoniesByCategoryId: LoadPatrimoniesByCategoryId
  loadPatrimoniesByOwnerId: LoadPatrimoniesByOwnerId
  loadPatrimoniesBySectorId: LoadPatrimoniesBySectorId
  loadPatrimonyByNumber: LoadPatrimonyByNumber
  deletePatrimony: DeletePatrimony
}

const PatrimonyList: React.FC<Props> = ({
  loadPatrimonies,
  loadOwners,
  loadCategories,
  loadSectors,
  loadPatrimoniesByCategoryId,
  loadPatrimoniesByOwnerId,
  loadPatrimoniesBySectorId,
  loadPatrimonyByNumber,
  deletePatrimony
}: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({
      ...old,
      mainError: error.message,
      isLoading: false,
      categoryIsLoading: false,
      ownerIsLoading: false,
      sectorIsLoading: false
    }))
  })
  const [state, setState] = useState({
    isLoading: true,
    openDialog: false,
    mainError: '',
    reload: false,
    number: '',
    category: '',
    categoryInput: '',
    categories: [] as ComboOptions[],
    categoryIsLoading: false,
    owner: '',
    ownerInput: '',
    owners: [] as ComboOptions[],
    ownerIsLoading: false,
    sector: '',
    sectorInput: '',
    sectors: [] as ComboOptions[],
    sectorIsLoading: false,
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
      number: '',
      category: '',
      categoryInput: '',
      owner: '',
      ownerInput: '',
      sector: '',
      sectorInput: '',

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
      mainError: 'Dados n??o encontrados'
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

  const setOldPage = (): void => setState(old => ({ ...old, oldPage: state.currentPage }))

  const setResetPage = (): void => setState(old => ({ ...old, currentPage: 1, skip: 0 }))

  const isChangeCurrentPage = (): boolean => state.currentPage !== state.oldPage

  const fieldsIsEmpty = (): boolean => {
    if (!state.category && !state.owner && !state.number && !state.sector) {
      return true
    }
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

  const getPatrimoniesBySectorId = async (skip: number): Promise<void> => {
    loadPatrimoniesBySectorId.loadBySectorId({
      id: Number(state.sector),
      skip: skip,
      take: state.take
    })
      .then((data) => handlePatrimonies(data))
      .catch((error) => handleError(error))
  }

  useEffect(() => {
    setState(old => ({ ...old, ownerIsLoading: true }))
    loadOwners.load({})
      .then(data => {
        if (data) {
          setState(old => ({
            ...old,
            owners: data.model.map(owner => ({ value: owner.id.toString(), label: owner.name }))
          }))
        }
      })
      .then(() => setState(old => ({ ...old, ownerIsLoading: false })))
      .catch(error => handleError(error))
  }, [])

  useEffect(() => {
    setState(old => ({ ...old, categoryIsLoading: true }))
    loadCategories.load({})
      .then(data => {
        if (data) {
          setState(old => ({
            ...old,
            categories: data.model.map(category => ({ value: category.id.toString(), label: category.name }))
          }))
        }
      })
      .then(() => setState(old => ({ ...old, categoryIsLoading: false })))
      .catch(error => handleError(error))
  }, [])

  useEffect(() => {
    setState(old => ({ ...old, sectorIsLoading: true }))
    loadSectors.load({})
      .then(data => {
        if (data) {
          setState(old => ({
            ...old,
            sectors: data.model.map(sector => ({ value: sector.id.toString(), label: sector.name }))
          }))
        }
      })
      .then(() => setState(old => ({ ...old, sectorIsLoading: false })))
      .catch(error => handleError(error))
  }, [])

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
      // Caso oldPage n??o mudar quer dizer que somente a categoria mudou
      // Logo a pagina atual n??o sofreu altera????o
      // Ent??o ?? carregado a nova categoria partindo da primeira pagina
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
    if (state.sector) {
      if (isChangeCurrentPage()) {
        setOldPage()
        getPatrimoniesBySectorId(state.skip)
      } else {
        getPatrimoniesBySectorId(0)
        setResetPage()
      }
    }
  }, [state.sector, state.currentPage])

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
  }, [state.category, state.number, state.owner, state.sector])

  const handleDelete = (id: number): void => {
    deletePatrimony.delete({ id: id })
      .then(() => {
        setReload()
      })
      .catch(error => handleError(error))
  }
  return (
    <div className="patrimony-list-wrap" data-testid="patrimonies">
      <Header title="Patrim??nios" />
      <div className="container patrimony-list-content">
        <LoadContext.Provider value={{ state, setState }}>
          <div className="row gy-4">
            <FormContext.Provider value={{ state, setState }}>
              <Form />
            </FormContext.Provider>
            <ButtonNew to="/patrimonies/new" />
            {state.isLoading && <Loading />}
            {state.mainError && <Error error={state.mainError} handleReload={setReload} />}
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
