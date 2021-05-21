import './owner-update-styles.css'
import {
  Header,
  FormContext,
  Input,
  SubmitButton,
  FormStatus,
  Combobox,
  ComboOptions
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { useErrorHandler } from '@/presentation/hooks'
import { LoadSectors, UpdateOwner } from '@/domain/usecases'

import React, { FormEvent, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

type Props = {
  validation: Validation
  updateOwner: UpdateOwner
  loadSectors: LoadSectors
}

type Params = {
  id: string
}

const OwnerUpdate: React.FC<Props> = ({ updateOwner, validation, loadSectors }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({
      ...old,
      mainError: error.message,
      successMessage: '',
      isLoading: false,
      sectorIsLoading: false
    }))
  })
  const { id } = useParams<Params>()
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    mainError: '',
    sector: '',
    sectorError: '',
    sectors: [] as ComboOptions[],
    sectorIsLoading: false,
    name: '',
    nameError: ''
  })

  const setIsLoading = (field: string, value: boolean): void => {
    setState(old => ({ ...old, [field]: value }))
  }

  useEffect(() => {
    setIsLoading('sectorIsLoading', true)
    loadSectors.load({})
      .then(data => {
        if (data) {
          setState(old => ({
            ...old,
            sectors: data.model.map(sector => ({ value: sector.id.toString(), label: sector.name }))
          }))
        }
      })
      .then(() => setIsLoading('sectorIsLoading', false))
      .catch(error => handleError(error))
  }, [])

  useEffect(() => { validate('name') }, [state.name])
  useEffect(() => { validate('sector') }, [state.sector])

  const validate = (field: string): void => {
    const { name, sector } = state
    const formData = { name, sector }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({
      ...old,
      isFormInvalid: !!old.nameError || !!old.sectorError
    }))
  }

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    if (state.isFormInvalid || state.isLoading) return
    setState(old => ({ ...old, isLoading: true }))
    const { name, sector } = state

    updateOwner.update({
      id: Number(id),
      name,
      sectorId: Number(sector)
    }).then((owner) => {
      setState(old => ({
        ...old,
        isLoading: false,
        mainError: ''
      }))
      history.replace('/owners')
    }).catch((error) => handleError(error))
  }

  return (
    <div className="owner-update-wrap">
      <Header title="Atualizar Proprietário" />
      <FormContext.Provider value={{ state, setState }} >
        <div className="form-wrap" data-testid="form-wrap">
          <form data-testid="form" onSubmit={handleSubmit}>
            <h2>Atualizar Proprietário</h2>
            <div className="input-group">
              <Input type="text" name="name" placeholder="Nome" />
              <Combobox name="sector" placeholder="Setores" options={state.sectors} />
            </div>
            <SubmitButton text="Atualizar" />
            <FormStatus />
          </form>
        </div>
      </FormContext.Provider>
    </div>
  )
}

export default OwnerUpdate
