import './form-styles.css'
import { Input, Combobox, FormContext } from '@/presentation/components'

import React, { useContext } from 'react'

const Form: React.FC = () => {
  const { state } = useContext(FormContext)

  return (
    <form className="form-wrap">
      <div className="row">
        <div className="col-12 col-lg-4">
          <Combobox
            name="owner"
            placeholder="Proprietário"
            options={state.owners}
            disabled={!!state.number || !!state.category}
          />
        </div>
        <div className="col-12 col-lg-4">
          <Combobox
            name="category"
            placeholder="Categoria"
            options={state.categories}
            disabled={!!state.number}
          />
        </div>
        <div className="col-12 col-lg-4">
          <Input
            type="text" name="number"
            placeholder="Número"
            disabled={!!state.category}
          />
        </div>
        {/* <div className="col-12 col-lg-3">
          <Button variant="outlined" color="primary" text="Pesquisar" type="submit" data-testid="submit-button" />
        </div> */}
        <div className="col-12 col-lg-3">
        </div>
      </div>
    </form>
  )
}

export default Form
