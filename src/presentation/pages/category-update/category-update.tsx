import './category-update-styles.css'
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
import { LoadCategoryById, UpdateCategory } from '@/domain/usecases'

import React, { FormEvent, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

type Props = {
  validation: Validation
  updateCategory: UpdateCategory
  loadCategoryById: LoadCategoryById
}

type Params = {
  id: string
}

const CategoryUpdate: React.FC<Props> = ({ updateCategory, loadCategoryById, validation }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, mainError: error.message, isLoading: false }))
  })
  const history = useHistory()
  const { id } = useParams<Params>()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    mainError: '',
    name: '',
    nameError: ''
  })

  useEffect(() => {
    loadCategoryById.loadById({ id: Number(id) })
      .then((category) => {
        if (category) {
          setState(old => ({
            ...old,
            name: category.name
          }))
        }
      })
      .catch(error => handleError(error))
  }, [])

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

    updateCategory.update({
      id: Number(id),
      name
    }).then((category) => {
      setState(old => ({
        ...old,
        isLoading: false,
        mainError: ''
      }))
      history.replace('/categories')
    }).catch((error) => handleError(error))
  }

  return (
    <div className="category-update-wrap">
      <Header title="Atualizar Categoria" />
      <FormContext.Provider value={{ state, setState }} >
        <div className="form-wrap" data-testid="form-wrap">
          <form data-testid="form" onSubmit={handleSubmit}>
            <TitleForm>Atualizar Categoria</TitleForm>
            <Input type="text" name="name" placeholder="Nome" />
            <SubmitButton text="Atualizar" />
            <FormStatus />
          </form>
        </div>
      </FormContext.Provider>
    </div>
  )
}

export default CategoryUpdate
