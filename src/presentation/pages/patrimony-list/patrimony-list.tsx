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
import { LoadCategories, LoadOwners, LoadPatrimonies, LoadPatrimonyByNumber } from '@/domain/usecases'

import React, { useState, useEffect, FormEvent } from 'react'

type Props = {
  loadPatrimonies: LoadPatrimonies
  loadOwners: LoadOwners
  loadCategories: LoadCategories
  loadPatrimonyByNumber: LoadPatrimonyByNumber
}

const PatrimonyList: React.FC<Props> = ({ loadPatrimonies, loadOwners, loadCategories, loadPatrimonyByNumber }: Props) => {
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

  useEffect(() => {
    loadPatrimonies.load({})
      .then((patrimonies) => {
        setState(old => ({
          ...old,
          isLoading: false,
          totalPage: Math.ceil(patrimonies.length / state.take)
        }))
      })
      .catch((error) => handleError(error))
  }, [state.reload])

  useEffect(() => {
    loadPatrimonies.load({ skip: state.skip, take: state.take })
      .then((patrimonies) => {
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
      })
      .catch((error) => handleError(error))
  }, [state.skip, state.take, state.reload])

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

  const handleSearch = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    if (!state.number) {
      setState(old => ({ ...old, reload: !state.reload }))
      return
    }
    const patrimony = await loadPatrimonyByNumber.loadByNumber({ number: state.number })
    if (patrimony) {
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
  }

  return (
    <div className="patrimony-list-wrap" data-testid="patrimonies">
      <Header title="Patrimônios" />
      <div className="container patrimony-list-content">
        <LoadContext.Provider value={{ state, setState }}>
          <div className="row gy-4">
            <FormContext.Provider value={{ state, setState }}>
              <Form handleSubmit={handleSearch} />
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
