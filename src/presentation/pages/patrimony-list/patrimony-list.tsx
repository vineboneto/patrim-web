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

import React, { useState, useEffect } from 'react'
import { PatrimonyModel } from '@/domain/models'

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
    mainError: '',
    reload: false,
    number: '',
    category: '',
    categories: [] as ComboOptions[],
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

  const setNotFound = (): void => {
    setState(old => ({
      ...old,
      isLoading: false,
      patrimonies: [],
      mainError: 'Nada foi encontrado'
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
      .then(owners => setState(old => ({
        ...old,
        isLoading: false,
        owners: owners.map(owner => ({ value: owner.id.toString(), label: owner.name }))
      })))
      .catch(error => handleError(error))
  }, [state.reload])

  useEffect(() => {
    loadCategories.load()
      .then(categories => setState(old => ({
        ...old,
        isLoading: false,
        categories: categories.map(category => ({ value: category.id.toString(), label: category.name }))
      })))
      .catch(error => handleError(error))
  }, [state.reload])

  useEffect(() => {
    loadPatrimonies.load({})
      .then((patrimonies) => setPagination(patrimonies.length))
      .catch((error) => handleError(error))
  }, [state.reload])

  useEffect(() => {
    loadPatrimonies.load({ skip: state.skip, take: state.take })
      .then((patrimonies) => setPatrimonies(patrimonies))
      .catch((error) => handleError(error))
  }, [state.skip, state.take, state.reload])

  useEffect(() => {
    if (state.category) {
      loadPatrimoniesByCategoryId.loadByCategoryId({
        id: Number(state.category),
        skip: state.skip,
        take: state.take
      })
        .then((patrimonies) => patrimonies ? setPatrimonies(patrimonies) : setNotFound())
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
    if (!state.number && !state.category) {
      setState(old => ({ ...old, reload: !state.reload, mainError: '' }))
    }
  }, [state.category, state.number])

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
            {state.patrimonies.map((patrimony) => <Item patrimony={patrimony} key={patrimony.id} />)}
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
