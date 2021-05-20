import './sector-create-styles.css'
import {
  Header,
  FormContext,
  Input,
  SubmitButton,
  FormStatus
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { useErrorHandler } from '@/presentation/hooks'
import { AddSector } from '@/domain/usecases'

import React, { FormEvent, useEffect, useState } from 'react'

type Props = {
  validation: Validation
  addSector: AddSector
}

const PatrimonyCreate: React.FC<Props> = ({ addSector, validation }: Props) => {
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

    addSector.add({
      name
    }).then((sector) => setState(old => ({
      ...old,
      successMessage: 'Setor adicionado com sucesso',
      isLoading: false,
      mainError: ''
    }))).catch((error) => handleError(error))
  }

  return (
    <div className="sector-create-wrap">
      <Header title="Novo Setor" />
      <FormContext.Provider value={{ state, setState }} >
        <div className="form-wrap" data-testid="form-wrap">
          <form data-testid="form" onSubmit={handleSubmit}>
            <h2>Novo Setor</h2>
            <Input type="text" name="name" placeholder="Nome" />
            <SubmitButton text="Criar" />
            <FormStatus />
          </form>
        </div>
      </FormContext.Provider>
    </div>
  )
}

export default PatrimonyCreate
