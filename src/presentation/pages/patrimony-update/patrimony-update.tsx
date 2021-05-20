import './patrimony-update-styles.css'
import {
  Header,
  FormContext,
  Input,
  Textarea,
  Combobox,
  ComboOptions,
  SubmitButton,
  FormStatus
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { useErrorHandler } from '@/presentation/hooks'
import { UpdatePatrimony, LoadCategories, LoadOwners, LoadPatrimonyById } from '@/domain/usecases'

import React, { FormEvent, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

type Props = {
  validation: Validation
  updatePatrimony: UpdatePatrimony
  loadPatrimonyById: LoadPatrimonyById
  loadCategories: LoadCategories
  loadOwners: LoadOwners
}

type Params = {
  id: string
}

const PatrimonyUpdate: React.FC<Props> = ({
  validation,
  updatePatrimony,
  loadPatrimonyById,
  loadCategories,
  loadOwners
}: Props) => {
  const { id } = useParams<Params>()
  const history = useHistory()
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, mainError: error.message, isLoading: false }))
  })
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    mainError: '',
    number: '',
    numberError: '',
    brand: '',
    brandError: '',
    category: '',
    categoryInput: '',
    categoryError: '',
    owner: '',
    ownerInput: '',
    ownerError: '',
    description: '',
    categories: [] as ComboOptions[],
    owners: [] as ComboOptions[]
  })

  useEffect(() => {
    loadCategories.load({})
      .then(data => {
        if (data) {
          setState(old => ({
            ...old,
            categories: data.model.map(category => ({ value: category.id.toString(), label: category.name }))
          }))
        }
      })
      .catch(error => handleError(error))
  }, [])

  useEffect(() => {
    loadOwners.load({})
      .then(data => {
        if (data) {
          setState(old => ({
            ...old,
            owners: data.model.map(owner => ({ value: owner.id.toString(), label: owner.name }))
          }))
        }
      })
      .catch(error => handleError(error))
  }, [])

  useEffect(() => {
    loadPatrimonyById.loadById({ id: Number(id) })
      .then((patrimony) => {
        if (patrimony) {
          setState(old => ({
            ...old,
            brand: patrimony.brand,
            number: patrimony.number,
            owner: patrimony.owner.id.toString(),
            ownerInput: patrimony.owner.name,
            categoryInput: patrimony.category.name,
            category: patrimony.category.id.toString(),
            description: patrimony.description
          }))
        }
      })
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
    updatePatrimony.update({
      id: Number(id),
      number,
      brand,
      categoryId: Number(category),
      ownerId: Number(owner),
      description
    })
      .then((patrimony) => {
        setState(old => ({
          ...old,
          isLoading: false,
          mainError: ''
        }))
        history.replace('/')
      })
      .catch((error) => handleError(error))
  }

  return (
    <div className="patrimony-update-wrap">
      <Header title="Atualizar Patrimônio" />
      <FormContext.Provider value={{ state, setState }} >
        <div className="form-wrap" data-testid="form-wrap">
          <form data-testid="form" onSubmit={handleSubmit}>
            <h2>Atualizar Patrimônio</h2>
            <div className="input-group">
              <Input type="text" name="number" placeholder="Número" />
              <Combobox name="owner" placeholder="Proprietário" options={state.owners} />
            </div>
            <div className="input-group">
              <Input type="text" name="brand" placeholder="Marca" />
              <Combobox name="category" placeholder="Categoria" options={state.categories} />
            </div>
            <Textarea name="description" placeholder="Observação" />
            <SubmitButton text="Atualizar" />
            <FormStatus />
          </form>
        </div>
      </FormContext.Provider>
    </div>
  )
}

export default PatrimonyUpdate
