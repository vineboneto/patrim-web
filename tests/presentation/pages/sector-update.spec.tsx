import { SectorUpdate } from '@/presentation/pages'
import { ApiContext } from '@/presentation/components'
import { AccountModel } from '@/domain/models'
import {
  getValueInput,
  populateField,
  testStatusForField,
  ValidationStub
} from '@/tests/presentation/mocks'
import { UpdateSectorSpy, mockAccountModel, LoadSectorByIdSpy } from '@/tests/domain/mocks'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import faker from 'faker'

type Params = {
  validationError?: string
  updateSectorSpy?: UpdateSectorSpy
  loadSectorByIdSpy?: LoadSectorByIdSpy
}

type SutTypes = {
  validationStub: ValidationStub
  updateSectorSpy: UpdateSectorSpy
  loadSectorByIdSpy: LoadSectorByIdSpy
  setCurrentAccountMock: (account: AccountModel) => void
  history: MemoryHistory
}

const makeSut = ({
  updateSectorSpy = new UpdateSectorSpy(),
  validationError = undefined,
  loadSectorByIdSpy = new LoadSectorByIdSpy()
}: Params = {}): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/sectors/update/1'] })
  const setCurrentAccountMock = jest.fn()
  const validationStub = new ValidationStub()
  validationStub.errorMessage = validationError
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <SectorUpdate
          loadSectorById={loadSectorByIdSpy}
          updateSector={updateSectorSpy}
          validation={validationStub}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    validationStub,
    updateSectorSpy,
    setCurrentAccountMock,
    loadSectorByIdSpy,
    history
  }
}

const simulateValidSubmit = async (name = faker.name.findName()): Promise<void> => {
  await waitFor(() => screen.getByTestId('form'))
  populateField('name', name)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => screen.getByTestId('form'))
}

describe('SectorUpdate Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    expect(screen.getByTestId('status-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    testStatusForField('name', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('name')
    testStatusForField('name', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    makeSut()
    populateField('name')
    testStatusForField('name')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    populateField('name')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('Should call UpdateSector with correct values', async () => {
    const { updateSectorSpy } = makeSut()
    const name = faker.name.findName()
    simulateValidSubmit(name)
      .then(() => {
        expect(updateSectorSpy.params).toEqual({
          id: 1,
          name
        })
      })
      .catch(error => console.log(error))
  })

  test('Should not call UpdateSector if form is invalid', async () => {
    const validationError = faker.random.words()
    const { updateSectorSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(updateSectorSpy.callsCount).toBe(0)
  })

  test('Should present error if update fails', async () => {
    const { updateSectorSpy } = makeSut()
    const error = new Error()
    error.message = 'something error'
    jest.spyOn(updateSectorSpy, 'update').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  test('Should calls LoadSectorById', async () => {
    const { loadSectorByIdSpy } = makeSut()
    await waitFor(() => screen.getByTestId('form'))
    expect(loadSectorByIdSpy.callsCount).toBe(1)
    expect(getValueInput('name')).toBe(loadSectorByIdSpy.model.name)
  })

  test('Should render main error if LoadSectorById fails', async () => {
    const loadSectorByIdSpy = new LoadSectorByIdSpy()
    const error = new Error()
    error.message = 'something error'
    jest.spyOn(loadSectorByIdSpy, 'loadById').mockRejectedValueOnce(error)
    makeSut({ loadSectorByIdSpy })
    await waitFor(() => screen.getByTestId('form'))
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  test('Should close alert error on click button close', async () => {
    const { updateSectorSpy } = makeSut()
    const error = new Error()
    error.message = 'something error'
    jest.spyOn(updateSectorSpy, 'update').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    const alertButtonClose = screen.getByTestId('main-error').children[2].children[0]
    fireEvent.click(alertButtonClose)
    expect(screen.getByTestId('status-wrap').children).toHaveLength(0)
  })
})
