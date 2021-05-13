import { PatrimonyCreate } from '@/presentation/pages'
import { ApiContext } from '@/presentation/components'
import { AccountModel } from '@/domain/models'
import { AccessDeniedError } from '@/domain/errors'
import {
  populateField,
  populateFieldSelect,
  testStatusForField,
  testStatusForFieldSelect,
  ValidationStub
} from '@/tests/presentation/mocks'
import { AddPatrimonySpy, LoadCategoriesSpy, LoadOwnersSpy, mockAccountModel } from '@/tests/domain/mocks'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import faker from 'faker'

type Params = {
  validationError?: string
  addPatrimonySpy?: AddPatrimonySpy
  loadCategoriesSpy?: LoadCategoriesSpy
  loadOwnersSpy?: LoadOwnersSpy
}

type SutTypes = {
  validationStub: ValidationStub
  addPatrimonySpy: AddPatrimonySpy
  loadCategoriesSpy: LoadCategoriesSpy
  loadOwnersSpy: LoadOwnersSpy
  setCurrentAccountMock: (account: AccountModel) => void
  history: MemoryHistory
}

const makeSut = ({
  addPatrimonySpy = new AddPatrimonySpy(),
  validationError = undefined,
  loadCategoriesSpy = new LoadCategoriesSpy(),
  loadOwnersSpy = new LoadOwnersSpy()
}: Params = {}): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/patrimonies/new'] })
  const setCurrentAccountMock = jest.fn()
  const validationStub = new ValidationStub()
  validationStub.errorMessage = validationError
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <PatrimonyCreate
          loadCategories={loadCategoriesSpy}
          loadOwners={loadOwnersSpy}
          addPatrimony={addPatrimonySpy}
          validation={validationStub}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    validationStub,
    addPatrimonySpy,
    loadCategoriesSpy,
    loadOwnersSpy,
    setCurrentAccountMock,
    history
  }
}

const simulateValidSubmit = async (number = faker.datatype.number().toString(), brand = faker.random.word(),
  owner = faker.datatype.number().toString(), category = faker.datatype.number().toString(),
  description = faker.random.words()): Promise<void> => {
  await waitFor(() => screen.getByTestId('form'))
  populateField('number', number)
  populateField('brand', brand)
  populateField('description', description)
  populateFieldSelect('owner', owner)
  populateFieldSelect('category', category)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => screen.getByTestId('form'))
}

describe('PatrimonyCreate Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    expect(screen.getByTestId('status-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    testStatusForField('number', validationError)
    testStatusForField('brand', validationError)
    testStatusForFieldSelect('owner', validationError)
    testStatusForFieldSelect('category', validationError)
  })

  test('Should show number error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('number')
    testStatusForField('number', validationError)
  })

  test('Should show brand error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('brand')
    testStatusForField('brand', validationError)
  })

  test('Should show owner error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateFieldSelect('owner')
    testStatusForFieldSelect('owner', validationError)
  })

  test('Should show category error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateFieldSelect('category')
    testStatusForFieldSelect('category', validationError)
  })

  test('Should show valid number state if Validation succeeds', () => {
    makeSut()
    populateField('number')
    testStatusForField('number')
  })

  test('Should show valid brand state if Validation succeeds', () => {
    makeSut()
    populateField('brand')
    testStatusForField('brand')
  })

  test('Should show valid owner state if Validation succeeds', () => {
    makeSut()
    populateFieldSelect('owner')
    testStatusForFieldSelect('owner')
  })

  test('Should show valid category state if Validation succeeds', () => {
    makeSut()
    populateFieldSelect('category')
    testStatusForFieldSelect('category')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    populateField('number')
    populateField('brand')
    populateFieldSelect('owner')
    populateFieldSelect('category')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('Should call AddPatrimony with correct values', async () => {
    const { addPatrimonySpy } = makeSut()
    const number = faker.datatype.number().toString()
    const brand = faker.random.word()
    const category = faker.datatype.number({ min: 1, max: 3 })
    const owner = faker.datatype.number({ min: 1, max: 3 })
    const description = faker.random.words()
    await simulateValidSubmit(number, brand, owner.toString(), category.toString(), description)
    expect(addPatrimonySpy.params).toEqual({
      number,
      brand,
      categoryId: category,
      ownerId: owner,
      description
    })
  })

  test('Should not call AddPatrimony if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addPatrimonySpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(addPatrimonySpy.callsCount).toBe(0)
  })

  test('Should present error if add fails', async () => {
    const { addPatrimonySpy } = makeSut()
    const error = new Error()
    error.message = 'something error'
    jest.spyOn(addPatrimonySpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  test('Should present success message if add success', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.getByTestId('success-message')).toHaveTextContent('Patrimônio adicionado com sucesso')
  })

  test('Should close alert success on click button close', async () => {
    makeSut()
    await simulateValidSubmit()
    const alertButtonClose = screen.getByTestId('success-message').children[2].children[0]
    fireEvent.click(alertButtonClose)
    expect(screen.getByTestId('status-wrap').children).toHaveLength(0)
  })

  test('Should close alert error on click button close', async () => {
    const { addPatrimonySpy } = makeSut()
    const error = new Error()
    error.message = 'something error'
    jest.spyOn(addPatrimonySpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    const alertButtonClose = screen.getByTestId('main-error').children[2].children[0]
    fireEvent.click(alertButtonClose)
    expect(screen.getByTestId('status-wrap').children).toHaveLength(0)
  })

  test('Should logout on AccessDeniedError by AddPatrimony', async () => {
    const addPatrimonySpy = new AddPatrimonySpy()
    jest.spyOn(addPatrimonySpy, 'add').mockRejectedValueOnce(new AccessDeniedError())
    const { history, setCurrentAccountMock } = makeSut({ addPatrimonySpy })
    await simulateValidSubmit()
    await waitFor(() => screen.getByTestId('form'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should calls LoadCategories', async () => {
    const { loadCategoriesSpy } = makeSut()
    fireEvent.click(screen.getByTestId('category').children[0])
    await waitFor(() => screen.getByTestId('form'))
    expect(loadCategoriesSpy.callsCount).toBe(1)
  })

  test('Should render main error if LoadCategories fails', async () => {
    const loadCategoriesSpy = new LoadCategoriesSpy()
    const error = new Error()
    error.message = 'something error'
    jest.spyOn(loadCategoriesSpy, 'load').mockRejectedValueOnce(error)
    makeSut({ loadCategoriesSpy })
    await waitFor(() => screen.getByTestId('category'))
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  test('Should logout on AccessDeniedError by LoadCategories', async () => {
    const loadCategoriesSpy = new LoadCategoriesSpy()
    jest.spyOn(loadCategoriesSpy, 'load').mockRejectedValueOnce(new AccessDeniedError())
    const { history, setCurrentAccountMock } = makeSut({ loadCategoriesSpy })
    await waitFor(() => screen.getByTestId('category'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should calls LoadOwners', async () => {
    const { loadOwnersSpy } = makeSut()
    fireEvent.click(screen.getByTestId('owner').children[0])
    await waitFor(() => screen.getByTestId('form'))
    expect(loadOwnersSpy.callsCount).toBe(1)
  })

  test('Should render main error if LoadOwners fails', async () => {
    const loadOwnersSpy = new LoadOwnersSpy()
    const error = new Error()
    error.message = 'something error'
    jest.spyOn(loadOwnersSpy, 'load').mockRejectedValueOnce(error)
    makeSut({ loadOwnersSpy })
    await waitFor(() => screen.getByTestId('owner'))
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  test('Should logout on AccessDeniedError by LoadOwners', async () => {
    const loadOwnersSpy = new LoadOwnersSpy()
    jest.spyOn(loadOwnersSpy, 'load').mockRejectedValueOnce(new AccessDeniedError())
    const { history, setCurrentAccountMock } = makeSut({ loadOwnersSpy })
    await waitFor(() => screen.getByTestId('category'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
