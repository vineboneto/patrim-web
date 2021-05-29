import './patrimony-update-styles.css'
import {
  Header,
  FormContext,
  Input,
  InputGroup,
  Textarea,
  Combobox,
  ComboOptions,
  SubmitButton,
  FormStatus,
  TitleForm,
  FormContent
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
    setState(old => ({
      ...old,
      mainError: error.message,
      isLoading: false,
      categoryIsLoading: false,
      ownerIsLoading: false
    }))
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
    categoryIsLoading: false,
    owner: '',
    ownerInput: '',
    ownerError: '',
    ownerIsLoading: false,
    description: '',
    categories: [] as ComboOptions[],
    owners: [] as ComboOptions[]
  })

  const setIsLoading = (field: string, value: boolean): void => {
    setState(old => ({ ...old, [field]: value }))
  }

  useEffect(() => {
    setIsLoading('categoryIsLoading', true)
    loadCategories.load({})
      .then(data => {
        if (data) {
          setState(old => ({
            ...old,
            categories: data.model.map(category => ({ value: category.id.toString(), label: category.name }))
          }))
        }
      })
      .then(() => setIsLoading('categoryIsLoading', false))
      .catch(error => handleError(error))
  }, [])

  useEffect(() => {
    setIsLoading('ownerIsLoading', true)
    loadOwners.load({})
      .then(data => {
        if (data) {
          setState(old => ({
            ...old,
            owners: data.model.map(owner => ({ value: owner.id.toString(), label: owner.name }))
          }))
        }
      })
      .then(() => setIsLoading('ownerIsLoading', false))
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
        <FormContent handleSubmit={handleSubmit}>
          <TitleForm>Atualizar Patrimônio</TitleForm>
          <InputGroup>
            <Input type="text" name="number" placeholder="Número" />
            <Combobox name="owner" placeholder="Proprietário" options={state.owners} />
          </InputGroup>
          <InputGroup>
            <Input type="text" name="brand" placeholder="Marca" />
            <Combobox name="category" placeholder="Categoria" options={state.categories} />
          </InputGroup>
          <Textarea name="description" placeholder="Observação" />
          <SubmitButton text="Atualizar" />
          <FormStatus />
        </FormContent>
      </FormContext.Provider>
    </div>
  )
}

export default PatrimonyUpdate
