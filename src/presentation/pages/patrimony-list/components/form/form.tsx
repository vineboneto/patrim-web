import './form-styles.css'
import { Input, Button } from '@/presentation/components'

import React from 'react'

const Form: React.FC = () => {
  return (
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
  )
}

export default Form
