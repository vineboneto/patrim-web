import './patrimony-create-styles.css'
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
import { DialogCategory, DialogOwner } from '@/presentation/pages/patrimony-create/components'
import { Validation } from '@/presentation/protocols'
import { useErrorHandler } from '@/presentation/hooks'
import { AddCategory, AddOwner, AddPatrimony, LoadCategories, LoadOwners, LoadSectors } from '@/domain/usecases'

import React, { FormEvent, useEffect, useState } from 'react'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import IconButton from '@material-ui/core/IconButton'

type Props = {
  validation: Validation
  validationCategory: Validation
  validationOwner: Validation
  addPatrimony: AddPatrimony
  addCategory: AddCategory
  addOwner: AddOwner
  loadCategories: LoadCategories
  loadOwners: LoadOwners
  loadSectors: LoadSectors
}

const PatrimonyCreate: React.FC<Props> = ({
  validation,
  validationOwner,
  validationCategory,
  addPatrimony,
  addOwner,
  addCategory,
  loadCategories,
  loadOwners,
  loadSectors
}: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({
      ...old,
      mainError: error.message,
      successMessage: '',
      isLoading: false,
      categoryIsLoading: false,
      ownerIsLoading: false
    }))
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
    categoryIsLoading: false,
    owner: '',
    ownerError: '',
    ownerIsLoading: false,
    description: '',
    categories: [] as ComboOptions[],
    owners: [] as ComboOptions[],
    openDialogCategory: false,
    openDialogOwner: false
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
  }, [state.openDialogCategory])

  useEffect(() => {
    setIsLoading('ownerIsLoading', false)
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
  }, [state.openDialogOwner])

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
              <div className="dialog-content">
                <IconButton
                  className="open-dialog-content"
                  onClick={() => setState(old => ({ ...old, openDialogOwner: true }))}
                >
                  <AddCircleRoundedIcon color="primary" />
                </IconButton>
                <Combobox name="owner" placeholder="Proprietário" options={state.owners} />
                <DialogOwner
                  open={state.openDialogOwner}
                  validation={validationOwner}
                  handleCloseDialog={() => setState(old => ({ ...old, openDialogOwner: false }))}
                  addOwner={addOwner}
                  loadSectors={loadSectors}
                />
              </div>
            </div>
            <div className="input-group">
              <Input type="text" name="brand" placeholder="Marca" />
              <div className="dialog-content">
                <IconButton
                  className="open-dialog-content"
                  onClick={() => setState(old => ({ ...old, openDialogCategory: true }))}
                >
                  <AddCircleRoundedIcon color="primary" />
                </IconButton>
                <Combobox name="category" placeholder="Categoria" options={state.categories} />
                <DialogCategory
                  open={state.openDialogCategory}
                  validation={validationCategory}
                  handleCloseDialog={() => setState(old => ({ ...old, openDialogCategory: false }))}
                  addCategory={addCategory}
                />
              </div>
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
