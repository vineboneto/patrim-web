import './form-owner-create-styles.css'
import {
  FormContext,
  InputGroup,
  Input,
  Combobox,
  ComboOptions,
  Dialog,
  FormContent
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { useErrorHandler } from '@/presentation/hooks'
import { AddOwner, LoadSectors } from '@/domain/usecases'

import React, { FormEvent, useEffect, useState } from 'react'

type Props = {
  validation: Validation
  addOwner: AddOwner
  loadSectors: LoadSectors
  open: boolean
  handleCloseDialog: () => void
}

const OwnerCreate: React.FC<Props> = ({
  addOwner,
  validation,
  loadSectors,
  open,
  handleCloseDialog
}: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({
      ...old,
      mainError: error.message,
      isLoading: false,
      sectorIsLoading: false
    }))
  })
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

    addOwner.add({
      name,
      sectorId: Number(sector)
    }).then((owner) => {
      setState(old => ({
        ...old,
        isLoading: false,
        mainError: '',
        name: '',
        sector: ''
      }))
      handleCloseDialog()
    }).catch((error) => handleError(error))
  }

  return (
    <Dialog
      open={open}
      handleCloseDialog={handleCloseDialog}
      title="Novo Propriet??rio"
      textActionDialog="criar"
      handleAction={handleSubmit}
    >
      <div className="form-content-dialog">
        <FormContext.Provider value={{ state, setState }} >
          <FormContent>
            <InputGroup>
              <Input type="text" name="name" placeholder="Nome" />
              <Combobox name="sector" placeholder="Setores" options={state.sectors} />
            </InputGroup>
          </FormContent>
        </FormContext.Provider>
      </div>
    </Dialog>
  )
}

export default OwnerCreate
