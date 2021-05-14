import './patrimony-list-styles.css'

import { Header, FormContext, Loading } from '@/presentation/components'
import { Item, Form, ButtonNew } from '@/presentation/pages/patrimony-list/components'

import React, { useState } from 'react'
import Pagination from '@material-ui/lab/Pagination'

const PatrimonyList: React.FC = () => {
  const [state, setState] = useState({
    isLoading: true,
    number: '',
    category: '',
    owner: ''
  })

  return (
    <div className="patrimony-list-wrap">
      <Header title="Patrimônios" />
      <div className="container patrimony-list-content">
        <div className="row gy-4">
          <FormContext.Provider value={{ state, setState }}>
            <Form />
          </FormContext.Provider>
          <div className="col-12">
            <ButtonNew />
          </div>
          { state.isLoading &&
          <div className="col-12 loading">
            <Loading />
          </div> }
          <div className="col-12 col-md-6 col-lg-4">
            <Item />
          </div>
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
