import { CategoryUpdate } from '@/presentation/pages'
import { ApiContext } from '@/presentation/components'
import { AccountModel } from '@/domain/models'
import {
  populateField,
  testStatusForField,
  ValidationStub
} from '@/tests/presentation/mocks'
import { UpdateCategorySpy, mockAccountModel } from '@/tests/domain/mocks'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import faker from 'faker'

type Params = {
  validationError?: string
  updateCategorySpy?: UpdateCategorySpy
}

type SutTypes = {
  validationStub: ValidationStub
  updateCategorySpy: UpdateCategorySpy
  setCurrentAccountMock: (account: AccountModel) => void
  history: MemoryHistory
}

const makeSut = ({
  updateCategorySpy = new UpdateCategorySpy(),
  validationError = undefined
}: Params = {}): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/categories/update/1'] })
  const setCurrentAccountMock = jest.fn()
  const validationStub = new ValidationStub()
  validationStub.errorMessage = validationError
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <CategoryUpdate
          updateCategory={updateCategorySpy}
          validation={validationStub}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    validationStub,
    updateCategorySpy,
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

describe('CategoryUpdate Component', () => {
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

  test('Should call UpdateCategory with correct values', async () => {
    const { updateCategorySpy } = makeSut()
    const name = faker.name.findName()
    simulateValidSubmit(name)
      .then(() => {
        expect(updateCategorySpy.params).toEqual({
          id: 1,
          name
        })
      })
      .catch(error => console.log(error))
  })

  test('Should not call UpdateCategory if form is invalid', async () => {
    const validationError = faker.random.words()
    const { updateCategorySpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(updateCategorySpy.callsCount).toBe(0)
  })

  test('Should present error if update fails', async () => {
    const { updateCategorySpy } = makeSut()
    const error = new Error()
    error.message = 'something error'
    jest.spyOn(updateCategorySpy, 'update').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  test('Should close alert error on click button close', async () => {
    const { updateCategorySpy } = makeSut()
    const error = new Error()
    error.message = 'something error'
    jest.spyOn(updateCategorySpy, 'update').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    const alertButtonClose = screen.getByTestId('main-error').children[2].children[0]
    fireEvent.click(alertButtonClose)
    expect(screen.getByTestId('status-wrap').children).toHaveLength(0)
  })
})
