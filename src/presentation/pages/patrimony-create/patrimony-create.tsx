import './patrimony-create-styles.css'
import { Header, DashBoard, DashboardContext, FormContext, Input, Textarea, Select } from '@/presentation/components'

import React, { useState } from 'react'

const PatrimonyCreate: React.FC = () => {
  const [state, setState] = useState({
    openDashboard: true,
    number: '',
    numberError: '',
    brand: '',
    brandError: '',
    description: ''
  })

  return (
    <div className="patrimony-create-wrap">
      <DashboardContext.Provider value ={{ state, setState }}>
        <Header title="Novo Patrimônio" />
        <DashBoard />
      </DashboardContext.Provider>
      <FormContext.Provider value={{ state }} >
        <div className="form-wrap">
          <form>
            <h2>Novo Patrimônio</h2>
            <Input type="text" name="number" placeholder="Número" />
            <Input type="text" name="brand" placeholder="Marca" />
            <Textarea name="description" placeholder="Observação" />
            <Select name="category" placeholder="Categoria" />
            <Select name="owner" placeholder="Proprietário" />
          </form>
        </div>
      </FormContext.Provider>
    </div>
  )
}

export default PatrimonyCreate
