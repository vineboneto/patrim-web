import './patrimony-list-styles.css'

import { Header, Input, FormContext, Button } from '@/presentation/components'
import { Item } from '@/presentation/pages/patrimony-list/components'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from '@material-ui/lab/Pagination'

const PatrimonyList: React.FC = () => {
  const [state, setState] = useState({
    isLoading: false,
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
            <form className="form-content">
              <div className="row">
                <div className="col-12 col-lg-3">
                  <Input type="text" name="owner" placeholder="Proprietário" />
                </div>
                <div className="col-12 col-lg-3">
                  <Input type="text" name="number" placeholder="Número" />
                </div>
                <div className="col-12 col-lg-3">
                  <Input name="category" placeholder="Categoria" />
                </div>
                <div className="col-12 col-lg-3">
                  <Button variant="outlined" color="primary" text="Pesquisar" />
                </div>
              </div>
            </form>
          </FormContext.Provider>
          <div className="col-12">
            <Link to="/patrimonies/new">
              <Button variant="contained" color="primary" text="Novo" />
            </Link>
          </div>
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
