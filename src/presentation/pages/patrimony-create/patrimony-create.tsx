import './patrimony-create-styles.css'
import {
  Header,
  FormContext,
  Input,
  Textarea,
  Select,
  ItemProps,
  SubmitButton,
  FormStatus
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { useErrorHandler } from '@/presentation/hooks'
import { AddPatrimony, LoadCategories, LoadOwners } from '@/domain/usecases'

import React, { FormEvent, useEffect, useState } from 'react'

type Props = {
  validation: Validation
  addPatrimony: AddPatrimony
  loadCategories: LoadCategories
  loadOwners: LoadOwners
}

const PatrimonyCreate: React.FC<Props> = ({ validation, addPatrimony, loadCategories, loadOwners }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, mainError: error.message, successMessage: '', isLoading: false }))
  })
  const [state, setState] = useState({
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
    description: '',
    categories: [] as ItemProps[],
    owners: [] as ItemProps[]
  })

  useEffect(() => {
    loadCategories.load()
      .then(categories => setState(old => ({
        ...old,
        categories: categories.map(category => ({ value: category.id.toString(), label: category.name }))
      })))
      .catch(error => handleError(error))
  }, [])

  useEffect(() => {
    loadOwners.load()
      .then(owners => setState(old => ({
        ...old,
        owners: owners.map(owner => ({ value: owner.id.toString(), label: owner.name }))
      })))
      .catch(error => handleError(error))
  }, [])

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
    }).then((patrimony) => setState(old => ({
      ...old,
      successMessage: 'Patrimônio adicionado com sucesso',
      isLoading: false,
      mainError: ''
    }))).catch((error) => handleError(error))
  }

  return (
    <div className="patrimony-create-wrap">
      <Header title="Novo Patrimônio" />
      <FormContext.Provider value={{ state, setState }} >
        <div className="form-wrap" data-testid="form-wrap">
          <form data-testid="form" onSubmit={handleSubmit}>
            <h2>Novo Patrimônio</h2>
            <div className="input-group">
              <Input type="text" name="number" placeholder="Número" />
              <Select name="owner" placeholder="Proprietário" options={state.owners} />
            </div>
            <div className="input-group">
              <Input type="text" name="brand" placeholder="Marca" />
              <Select name="category" placeholder="Categoria" options={state.categories} />
            </div>
            <Textarea name="description" placeholder="Observação" />
            <SubmitButton text="Criar" />
            <FormStatus />
          </form>
        </div>
      </FormContext.Provider>
    </div>
  )
}

export default PatrimonyCreate
