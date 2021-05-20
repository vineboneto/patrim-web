import { CategoryCreate } from '@/presentation/pages'
import { ApiContext } from '@/presentation/components'
import { AccountModel } from '@/domain/models'
import {
  populateField,
  testStatusForField,
  ValidationStub
} from '@/tests/presentation/mocks'
import { AddCategorySpy, mockAccountModel } from '@/tests/domain/mocks'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import faker from 'faker'

type Params = {
  validationError?: string
  addCategorySpy?: AddCategorySpy
}

type SutTypes = {
  validationStub: ValidationStub
  addCategorySpy: AddCategorySpy
  setCurrentAccountMock: (account: AccountModel) => void
  history: MemoryHistory
}

const makeSut = ({
  addCategorySpy = new AddCategorySpy(),
  validationError = undefined
}: Params = {}): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/categories/new'] })
  const setCurrentAccountMock = jest.fn()
  const validationStub = new ValidationStub()
  validationStub.errorMessage = validationError
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <CategoryCreate
          addCategory={addCategorySpy}
          validation={validationStub}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    validationStub,
    addCategorySpy,
    setCurrentAccountMock,
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

describe('CategoryCreate Component', () => {
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

  test('Should call AddCategory with correct values', async () => {
    const { addCategorySpy } = makeSut()
    const name = faker.name.findName()
    simulateValidSubmit(name)
      .then(() => {
        expect(addCategorySpy.params).toEqual({
          name
        })
      })
      .catch(error => console.log(error))
  })

  test('Should not call AddCategory if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addCategorySpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(addCategorySpy.callsCount).toBe(0)
  })

  test('Should present error if add fails', async () => {
    const { addCategorySpy } = makeSut()
    const error = new Error()
    error.message = 'something error'
    jest.spyOn(addCategorySpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  test('Should present success message if add success', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.getByTestId('success-message')).toHaveTextContent('Categoria adicionado com sucesso')
  })

  test('Should close alert success on click button close', async () => {
    makeSut()
    await simulateValidSubmit()
    const alertButtonClose = screen.getByTestId('success-message').children[2].children[0]
    fireEvent.click(alertButtonClose)
    expect(screen.getByTestId('status-wrap').children).toHaveLength(0)
  })

  test('Should close alert error on click button close', async () => {
    const { addCategorySpy } = makeSut()
    const error = new Error()
    error.message = 'something error'
    jest.spyOn(addCategorySpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    const alertButtonClose = screen.getByTestId('main-error').children[2].children[0]
    fireEvent.click(alertButtonClose)
    expect(screen.getByTestId('status-wrap').children).toHaveLength(0)
  })
})
