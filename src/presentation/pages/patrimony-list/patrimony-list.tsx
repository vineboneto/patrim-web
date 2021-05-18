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
  LoadPatrimonyByNumber
} from '@/domain/usecases'
import { PatrimonyModel } from '@/domain/models'

import React, { useState, useEffect } from 'react'

type Props = {
  loadPatrimonies: LoadPatrimonies
  loadOwners: LoadOwners
  loadCategories: LoadCategories
  loadPatrimoniesByCategoryId: LoadPatrimoniesByCategoryId
  loadPatrimonyByNumber: LoadPatrimonyByNumber
  deletePatrimony: DeletePatrimony
}

const PatrimonyList: React.FC<Props> = ({
  loadPatrimonies,
  loadOwners,
  loadCategories,
  loadPatrimoniesByCategoryId,
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

  const setReload = (): void => {
    setState(old => ({
      ...old,
      reload: !state.reload,
      mainError: '',
      categoryInput: ''
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

  useEffect(() => {
    loadOwners.load()
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
    loadCategories.load()
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
    loadPatrimonies.load({ skip: state.skip, take: state.take })
      .then((data) => {
        if (data) {
          setPatrimonies(data.model)
          setPagination(data.count)
        } else {
          setNotFound()
        }
      })
      .catch((error) => handleError(error))
  }, [state.skip, state.take, state.reload])

  useEffect(() => {
    if (state.category) {
      loadPatrimoniesByCategoryId.loadByCategoryId({
        id: Number(state.category),
        skip: state.skip,
        take: state.take
      })
        .then((data) => data.model ? setPatrimonies(data.model) : setNotFound())
        .catch((error) => handleError(error))
    }
  }, [state.take, state.skip, state.category])

  useEffect(() => {
    if (state.number) {
      loadPatrimonyByNumber.loadByNumber({ number: state.number })
        .then((patrimony) => { if (patrimony) setPatrimony(patrimony) })
        .catch(error => handleError(error))
    }
  }, [state.number])

  useEffect(() => {
    if (!state.number && !state.category) setReload()
  }, [state.category, state.number])

  const handleDelete = (id: number): void => {
    deletePatrimony.delete({ id: id })
      .then(() => {
        setReload()
      })
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
