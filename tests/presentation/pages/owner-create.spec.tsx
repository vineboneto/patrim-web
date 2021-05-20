import { OwnerCreate } from '@/presentation/pages'
import { ApiContext } from '@/presentation/components'
import { AccountModel } from '@/domain/models'
import {
  populateField,
  testStatusForField,
  ValidationStub
} from '@/tests/presentation/mocks'
import { AddOwnerSpy, LoadSectorsSpy, mockAccountModel } from '@/tests/domain/mocks'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import faker from 'faker'
import { AccessDeniedError } from '@/domain/errors'

type Params = {
  validationError?: string
  addOwnerSpy?: AddOwnerSpy
  loadSectorsSpy?: LoadSectorsSpy
}

type SutTypes = {
  validationStub: ValidationStub
  addOwnerSpy: AddOwnerSpy
  loadSectorsSpy: LoadSectorsSpy
  setCurrentAccountMock: (account: AccountModel) => void
  history: MemoryHistory
}

const makeSut = ({
  addOwnerSpy = new AddOwnerSpy(),
  loadSectorsSpy = new LoadSectorsSpy(),
  validationError = undefined
}: Params = {}): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/sectors/new'] })
  const setCurrentAccountMock = jest.fn()
  const validationStub = new ValidationStub()
  validationStub.errorMessage = validationError
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <OwnerCreate
          addOwner={addOwnerSpy}
          loadSectors={loadSectorsSpy}
          validation={validationStub}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    validationStub,
    addOwnerSpy,
    setCurrentAccountMock,
    history,
    loadSectorsSpy
  }
}

const simulateValidSubmit = async (name = faker.name.findName(), sector = faker.datatype.number().toString()): Promise<void> => {
  await waitFor(() => screen.getByTestId('form'))
  populateField('name', name)
  populateField('sector', sector)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => screen.getByTestId('form'))
}

describe('OwnerCreate Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    expect(screen.getByTestId('status-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    testStatusForField('name', validationError)
    testStatusForField('sector', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('name')
    populateField('sector')
    testStatusForField('name', validationError)
    testStatusForField('sector', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    makeSut()
    populateField('name')
    populateField('sector')
    testStatusForField('name')
    testStatusForField('sector')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    populateField('name')
    populateField('sector')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('Should call AddOwner with correct values', async () => {
    const { addOwnerSpy } = makeSut()
    const name = faker.name.findName()
    const sector = faker.datatype.number().toString()
    simulateValidSubmit(name, sector)
      .then(() => {
        expect(addOwnerSpy.params).toEqual({
          name,
          sectorId: Number(sector)
        })
      })
      .catch(error => console.log(error))
  })

  test('Should not call AddOwner if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addOwnerSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(addOwnerSpy.callsCount).toBe(0)
  })

  test('Should present error if add fails', async () => {
    const { addOwnerSpy } = makeSut()
    const error = new Error()
    error.message = 'something error'
    jest.spyOn(addOwnerSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  test('Should present success message if add success', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.getByTestId('success-message')).toHaveTextContent('Proprietário adicionado com sucesso')
  })

  test('Should close alert success on click button close', async () => {
    makeSut()
    await simulateValidSubmit()
    const alertButtonClose = screen.getByTestId('success-message').children[2].children[0]
    fireEvent.click(alertButtonClose)
    expect(screen.getByTestId('status-wrap').children).toHaveLength(0)
  })

  test('Should calls LoadSectors', async () => {
    const { loadSectorsSpy } = makeSut()
    fireEvent.click(screen.getByTestId('sector').children[0])
    await waitFor(() => screen.getByTestId('form'))
    expect(loadSectorsSpy.callsCount).toBe(1)
  })

  test('Should render main error if LoadSectors fails', async () => {
    const loadSectorsSpy = new LoadSectorsSpy()
    const error = new Error()
    error.message = 'something error'
    jest.spyOn(loadSectorsSpy, 'load').mockRejectedValueOnce(error)
    makeSut({ loadSectorsSpy })
    await waitFor(() => screen.getByTestId('sector'))
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  test('Should logout on AccessDeniedError by LoadSectors', async () => {
    const loadSectorsSpy = new LoadSectorsSpy()
    jest.spyOn(loadSectorsSpy, 'load').mockRejectedValueOnce(new AccessDeniedError())
    const { history, setCurrentAccountMock } = makeSut({ loadSectorsSpy })
    await waitFor(() => screen.getByTestId('sector'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should close alert error on click button close', async () => {
    const { addOwnerSpy } = makeSut()
    const error = new Error()
    error.message = 'something error'
    jest.spyOn(addOwnerSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    const alertButtonClose = screen.getByTestId('main-error').children[2].children[0]
    fireEvent.click(alertButtonClose)
    expect(screen.getByTestId('status-wrap').children).toHaveLength(0)
  })
})
