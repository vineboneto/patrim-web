import './form-styles.css'
import { Input, Button, Combobox, FormContext } from '@/presentation/components'

import React, { useContext, FormEvent } from 'react'

type Props = {
  handleSubmit: (e: FormEvent) => Promise<void>
}

const Form: React.FC<Props> = ({ handleSubmit }: Props) => {
  const { state } = useContext(FormContext)

  return (
    <form className="form-wrap" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12 col-lg-3">
          <Combobox name="owner" placeholder="Proprietário" options={state.owners} />
        </div>
        <div className="col-12 col-lg-3">
          <Combobox name="category" placeholder="Categoria" options={state.categories} />
        </div>
        <div className="col-12 col-lg-3">
          <Input type="text" name="number" placeholder="Número" />
        </div>
        <div className="col-12 col-lg-3">
          <Button variant="outlined" color="primary" text="Pesquisar" type="submit" data-testid="submit-button" />
        </div>
        <div className="col-12 col-lg-3">
        </div>
      </div>
    </form>
  )
}

export default Form
