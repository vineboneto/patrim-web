import './owner-update-styles.css'
import {
  Header,
  FormContext,
  Input,
  SubmitButton,
  FormStatus,
  Combobox,
  InputGroup,
  ComboOptions,
  TitleForm
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { useErrorHandler } from '@/presentation/hooks'
import { LoadOwnerById, LoadSectors, UpdateOwner } from '@/domain/usecases'

import React, { FormEvent, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

type Props = {
  validation: Validation
  updateOwner: UpdateOwner
  loadSectors: LoadSectors
  loadOwnerById: LoadOwnerById
}

type Params = {
  id: string
}

const OwnerUpdate: React.FC<Props> = ({ updateOwner, validation, loadSectors, loadOwnerById }: Props) => {
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
    sectorInput: '',
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

  useEffect(() => {
    loadOwnerById.loadById({ id: Number(id) })
      .then((owner) => {
        if (owner) {
          setState(old => ({
            ...old,
            name: owner.name,
            sector: owner.sector.id.toString(),
            sectorInput: owner.sector.name
          }))
        }
      })
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
            <TitleForm>Atualizar Proprietário</TitleForm>
            <InputGroup>
              <Input type="text" name="name" placeholder="Nome" />
              <Combobox name="sector" placeholder="Setores" options={state.sectors} />
            </InputGroup>
            <SubmitButton text="Atualizar" />
            <FormStatus />
          </form>
        </div>
      </FormContext.Provider>
    </div>
  )
}

export default OwnerUpdate
