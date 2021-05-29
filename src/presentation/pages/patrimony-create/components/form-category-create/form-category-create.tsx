import './form-category-create-styles.css'
import { FormContext, Input, Dialog, FormStatus, FormContent } from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { useErrorHandler } from '@/presentation/hooks'
import { AddCategory } from '@/domain/usecases'

import React, { FormEvent, useEffect, useState } from 'react'

type Props = {
  validation: Validation
  addCategory: AddCategory
  open: boolean
  handleCloseDialog: () => void
}

const CategoryCreate: React.FC<Props> = ({ addCategory, validation, open, handleCloseDialog }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, mainError: error.message, isLoading: false, name: '' }))
  })
  const [state, setState] = useState({
    isLoading: false,
    mainError: '',
    isFormInvalid: true,
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
    if (state.isLoading || state.isFormInvalid) return
    setState(old => ({ ...old, isLoading: true }))
    const { name } = state

    addCategory.add({
      name
    }).then((category) => {
      setState(old => ({
        ...old,
        isLoading: false,
        mainError: '',
        name: ''
      }))
      handleCloseDialog()
    }).catch((error) => handleError(error))
  }

  return (
    <Dialog
      open={open}
      title="Nova Categoria"
      handleAction={handleSubmit}
      handleCloseDialog={handleCloseDialog}
      textActionDialog="Criar"
    >
      <div className="form-content-dialog">
        <FormContext.Provider value={{ state, setState }} >
          <FormContent>
            <Input type="text" name="name" placeholder="Nome" />
            <FormStatus />
          </FormContent>
        </FormContext.Provider>
      </div>
    </Dialog>
  )
}

export default CategoryCreate
