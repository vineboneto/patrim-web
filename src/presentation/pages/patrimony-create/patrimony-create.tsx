import './patrimony-create-styles.css'
import {
  Header,
  DashBoard,
  DashboardContext,
  FormContext,
  Input,
  Textarea,
  Select,
  SubmitButton,
  FormStatus
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols'

import React, { useEffect, useState } from 'react'

type Props = {
  validation: Validation
}

const PatrimonyCreate: React.FC<Props> = ({ validation }: Props) => {
  const optionsCategory = [
    { value: '1', label: 'Computador' },
    { value: '2', label: 'Impressora' },
    { value: '3', label: 'Monitor' }
  ]
  const optionsOwners = [
    { value: '1', label: 'Weusley' },
    { value: '2', label: 'Jessica' },
    { value: '3', label: 'Camila' }
  ]
  const [state, setState] = useState({
    openDashboard: true,
    isLoading: false,
    isFormInvalid: true,
    mainError: '',
    number: '',
    numberError: '',
    brand: '',
    brandError: '',
    category: '',
    categoryError: '',
    owner: '',
    ownerError: '',
    description: ''
  })

  useEffect(() => { validate('number') }, [state.number])
  useEffect(() => { validate('brand') }, [state.brand])
  useEffect(() => { validate('owner') }, [state.owner])
  useEffect(() => { validate('category') }, [state.category])

  const validate = (field: string): void => {
    const { number, brand } = state
    const formData = { number, brand }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({
      ...old,
      isFormInvalid: !!old.numberError || !!old.brandError || !!old.categoryError || !!old.ownerError
    }))
  }

  return (
    <div className="patrimony-create-wrap">
      <DashboardContext.Provider value ={{ state, setState }}>
        <Header title="Novo Patrimônio" />
        <DashBoard />
      </DashboardContext.Provider>
      <FormContext.Provider value={{ state, setState }} >
        <div className="form-wrap" style={ state.openDashboard ? {} : { marginLeft: '30px' }}>
          <form>
            <h2>Novo Patrimônio</h2>
            <div className="input-group">
              <Input type="text" name="number" placeholder="Número" />
              <Select name="owner" placeholder="Proprietário" options={optionsOwners} />
            </div>
            <div className="input-group">
              <Input type="text" name="brand" placeholder="Marca" />
              <Select name="category" placeholder="Categoria" options={optionsCategory} />
            </div>
            <Textarea name="description" placeholder="Observação" />
            <SubmitButton text="Salvar" />
            <FormStatus />
          </form>
        </div>
      </FormContext.Provider>
    </div>
  )
}

export default PatrimonyCreate
