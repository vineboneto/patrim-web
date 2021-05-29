import './category-create-styles.css'
import {
  Header,
  FormContext,
  Input,
  SubmitButton,
  FormStatus,
  TitleForm
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { useErrorHandler } from '@/presentation/hooks'
import { AddCategory } from '@/domain/usecases'

import React, { FormEvent, useEffect, useState } from 'react'

type Props = {
  validation: Validation
  addCategory: AddCategory
}

const CategoryCreate: React.FC<Props> = ({ addCategory, validation }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, mainError: error.message, successMessage: '', isLoading: false }))
  })
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    successMessage: '',
    mainError: '',
    name: '',
    nameError: ''
  })

  useEffect(() => { validate('name') }, [state.name])

  const validate = (field: string): void => {
    const { name } = state
    const formData = { name }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({
      ...old,
      isFormInvalid: !!old.nameError
    }))
  }

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    if (state.isFormInvalid || state.isLoading) return
    setState(old => ({ ...old, isLoading: true }))
    const { name } = state

    addCategory.add({
      name
    }).then((category) => setState(old => ({
      ...old,
      successMessage: 'Categoria adicionado com sucesso',
      isLoading: false,
      mainError: ''
    }))).catch((error) => handleError(error))
  }

  return (
    <div className="category-create-wrap">
      <Header title="Novo Categoria" />
      <FormContext.Provider value={{ state, setState }} >
        <div className="form-wrap" data-testid="form-wrap">
          <form data-testid="form" onSubmit={handleSubmit}>
            <TitleForm>Nova Categoria</TitleForm>
            <Input type="text" name="name" placeholder="Nome" />
            <SubmitButton text="Criar" />
            <FormStatus />
          </form>
        </div>
      </FormContext.Provider>
    </div>
  )
}

export default CategoryCreate
