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
  Loading,
  Alert
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { AddPatrimony } from '@/domain/usecases'

import React, { FormEvent, useEffect, useState } from 'react'

type Props = {
  validation: Validation
  addPatrimony: AddPatrimony
}

const PatrimonyCreate: React.FC<Props> = ({ validation, addPatrimony }: Props) => {
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
    successMessage: '',
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
    const { number, brand, category, owner } = state
    const formData = { number, brand, category, owner }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({
      ...old,
      isFormInvalid: !!old.numberError || !!old.brandError || !!old.categoryError || !!old.ownerError
    }))
  }

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    if (state.isFormInvalid || state.isLoading) return
    setState(old => ({ ...old, isLoading: true }))
    const { brand, category, owner, number, description } = state
    addPatrimony.add({
      number,
      brand,
      categoryId: Number(category),
      ownerId: Number(owner),
      description
    })
      .then((patrimony) => setState(old => ({ ...old, successMessage: 'Patrimônio adicionado com sucesso', isLoading: false })))
      .catch((error) => setState(old => ({ ...old, mainError: error.message, isLoading: false })))
  }

  return (
    <div className="patrimony-create-wrap">
      <DashboardContext.Provider value ={{ state, setState }}>
        <Header title="Novo Patrimônio" />
        <DashBoard />
      </DashboardContext.Provider>
      <FormContext.Provider value={{ state, setState }} >
        <div className="form-wrap" style={ state.openDashboard ? {} : { marginLeft: '30px' }}>
          <form data-testid="form" onSubmit={handleSubmit}>
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
            <div className="status-wrap" data-testid="status-wrap">
              { state.isLoading && <Loading /> }
              { state.successMessage && <Alert type="success" message={state.successMessage} data-testid="success-message" /> }
              { state.mainError && <Alert type="error" message={state.mainError} data-testid="main-error" /> }
            </div>
          </form>
        </div>
      </FormContext.Provider>
    </div>
  )
}

export default PatrimonyCreate
