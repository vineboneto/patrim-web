import './form-styles.css'
import { Input, Button, Combobox, FormContext } from '@/presentation/components'

import React, { useContext } from 'react'

const categoryOptions = [
  { value: '1', label: 'Computador' },
  { value: '2', label: 'Impressora' }
]

const Form: React.FC = () => {
  const { state } = useContext(FormContext)

  return (
    <form className="form-wrap">
      <div className="row">
        <div className="col-12 col-lg-3">
          <Combobox name="owner" placeholder="Proprietário" options={state.owners} />
        </div>
        <div className="col-12 col-lg-3">
          <Combobox name="category" placeholder="Categoria" options={categoryOptions} />
        </div>
        <div className="col-12 col-lg-3">
          <Input type="text" name="number" placeholder="Número" />
        </div>
        <div className="col-12 col-lg-3">
          <Button variant="outlined" color="primary" text="Pesquisar" />
        </div>
        <div className="col-12 col-lg-3">
        </div>
      </div>
    </form>
  )
}

export default Form
