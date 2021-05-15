import './patrimony-list-styles.css'
import { Header, FormContext, Loading, Button } from '@/presentation/components'
import { Item, Form, ButtonNew, ItemProps } from '@/presentation/pages/patrimony-list/components'
import { useErrorHandler } from '@/presentation/hooks'
import { LoadPatrimonies } from '@/domain/usecases'

import React, { useState, useEffect } from 'react'
import Pagination from '@material-ui/lab/Pagination'

type Props = {
  loadPatrimonies: LoadPatrimonies
}

const PatrimonyList: React.FC<Props> = ({ loadPatrimonies }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, mainError: error.message, isLoading: false }))
  })
  const [state, setState] = useState({
    isLoading: true,
    mainError: '',
    number: '',
    category: '',
    owner: '',
    totalPage: 1,
    skip: 0,
    take: 12,
    patrimonies: [] as ItemProps[]
  })

  useEffect(() => {
    loadPatrimonies.load({})
      .then((patrimonies) => {
        setState(old => ({
          ...old,
          totalPage: Math.ceil(patrimonies.length / state.take)
        }))
      })
      .catch((error) => handleError(error))
  }, [])

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
  }, [state.skip, state.take])

  const handleChangePagination = (e: any, page: number): void => {
    setState(old => ({
      ...old,
      skip: (page - 1) * state.take
    }))
  }

  return (
    <div className="patrimony-list-wrap" data-testid="patrimonies">
      <Header title="Patrimônios" />
      <div className="container patrimony-list-content">
        <div className="row gy-4">
          <FormContext.Provider value={{ state, setState }}>
            <Form />
          </FormContext.Provider>
          <div className="col-12">
            <ButtonNew />
          </div>
          {state.isLoading &&
            <div className="col-12 loading">
              <Loading />
            </div>}
          {state.mainError &&
            <div className="col-12">
              <div className="error">
                <span>{state.mainError}</span>
                <Button color="secondary" variant="outlined" text="Recarregar" />
              </div>
            </div>}

          {state.patrimonies.map((patrimony) => (
            <div className="col-12 col-md-6 col-lg-4" role="item" key={patrimony.id}>
              <Item patrimony={patrimony} />
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-12 pagination-wrap">
            <Pagination
              data-testid="pagination"
              onChange={handleChangePagination}
              count={state.totalPage}
              size="large" color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatrimonyList
