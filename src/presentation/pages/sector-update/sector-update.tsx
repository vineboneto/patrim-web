import './sector-update-styles.css'
import {
  Header,
  FormContext,
  Input,
  SubmitButton,
  FormStatus
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { useErrorHandler } from '@/presentation/hooks'
import { LoadSectorById, UpdateSector } from '@/domain/usecases'

import React, { FormEvent, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

type Props = {
  validation: Validation
  updateSector: UpdateSector
  loadSectorById: LoadSectorById
}

type Params = {
  id: string
}

const SectorUpdate: React.FC<Props> = ({ updateSector, validation, loadSectorById }: Props) => {
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
    loadSectorById.loadById({ id: Number(id) })
      .then((sector) => {
        if (sector) {
          setState(old => ({
            ...old,
            name: sector.name
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

    updateSector.update({
      id: Number(id),
      name
    }).then((sector) => {
      setState(old => ({
        ...old,
        isLoading: false,
        mainError: ''
      }))
      history.replace('/sectors')
    }).catch((error) => handleError(error))
  }

  return (
    <div className="sector-update-wrap">
      <Header title="Atualizar Setor" />
      <FormContext.Provider value={{ state, setState }} >
        <div className="form-wrap" data-testid="form-wrap">
          <form data-testid="form" onSubmit={handleSubmit}>
            <h2>Atualizar Setor</h2>
            <Input type="text" name="name" placeholder="Nome" />
            <SubmitButton text="Atualizar" />
            <FormStatus />
          </form>
        </div>
      </FormContext.Provider>
    </div>
  )
}

export default SectorUpdate
