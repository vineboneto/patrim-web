import './form-styles.css'
import { Input, Combobox, FormContext } from '@/presentation/components'

import React, { useContext } from 'react'

const Form: React.FC = () => {
  const { state } = useContext(FormContext)

  return (
    <form className="form-wrap">
      <div className="row">
        <div className="col-12 col-lg-3">
          <Combobox
            name="owner"
            placeholder="Proprietário"
            options={state.owners}
            disabled={!!state.number || !!state.category || !!state.sector}
          />
        </div>
        <div className="col-12 col-lg-3">
          <Combobox
            name="category"
            placeholder="Categoria"
            options={state.categories}
            disabled={!!state.number || !!state.owner || !!state.sector}
          />
        </div>
        <div className="col-12 col-lg-3">
          <Combobox
            name="sector"
            placeholder="Setor"
            options={state.sectors}
            disabled={!!state.number || !!state.owner || !!state.category}
          />
        </div>
        <div className="col-12 col-lg-3">
          <Input
            type="text" name="number"
            placeholder="Número"
            disabled={!!state.category || !!state.owner || !!state.sector}
          />
        </div>
      </div>
    </form>
  )
}

export default Form
