import './form-styles.css'
import { Input, Button, Combobox } from '@/presentation/components'

import React from 'react'

const ownerOptions = [
  { value: '1', label: 'Vinicius' },
  { value: '2', label: 'Weusley' },
  { value: '3', label: 'Camila' }
]

const categoryOptions = [
  { value: '1', label: 'Computador' },
  { value: '2', label: 'Impressora' }
]

const Form: React.FC = () => {
  return (
    <form className="form-wrap">
      <div className="row">
        <div className="col-12 col-lg-3">
          <Combobox name="owner" placeholder="Proprietário" options={ownerOptions} />
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
