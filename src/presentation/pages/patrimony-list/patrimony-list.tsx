import './patrimony-list-styles.css'
import { Header, FormContext, Loading } from '@/presentation/components'
import { Item, Form, ButtonNew, ItemProps } from '@/presentation/pages/patrimony-list/components'
import { LoadPatrimonies } from '@/domain/usecases'

import React, { useState, useEffect } from 'react'
import Pagination from '@material-ui/lab/Pagination'

type Props = {
  loadPatrimonies: LoadPatrimonies
}

const PatrimonyList: React.FC<Props> = ({ loadPatrimonies }: Props) => {
  const [state, setState] = useState({
    isLoading: true,
    number: '',
    category: '',
    owner: '',
    patrimonies: [] as ItemProps[]
  })

  useEffect(() => {
    loadPatrimonies.load({ skip: 0, take: 9 })
      .then((patrimonies) => setState(old => ({
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
      })))
      .catch((error) => console.log(error))
  }, [])

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
          { state.patrimonies.map((patrimony) => (
            <div className="col-12 col-md-6 col-lg-4" key={patrimony.id} >
              <Item patrimony={patrimony} />
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-12 pagination-wrap">
            <Pagination count={1} size="large" color="primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatrimonyList
