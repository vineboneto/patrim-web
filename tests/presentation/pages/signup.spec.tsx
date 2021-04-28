import { SignUp } from '@/presentation/pages'
import { ValidationStub } from '@/tests/presentation/mocks'
import { AddAccountSpy } from '@/tests/domain/mocks'

import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import faker from 'faker'

type Params = {
  validationError: string
}

type SutTypes = {
  validationStub: ValidationStub
  addAccountSpy: AddAccountSpy
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (params?: Params): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  render(
    <Router history={history}>
      <SignUp validation={validationStub} addAccount={addAccountSpy} />
    </Router>
  )
  return {
    validationStub,
    addAccountSpy
  }
}

const testStatusForField = (fieldName: string, validationError: string = ''): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(`${fieldName}`)
  const label = screen.getByTestId(`${fieldName}-label`)
  expect(wrap).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid')
  expect(field).toHaveProperty('title', validationError)
  expect(label).toHaveProperty('title', validationError)
}

const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

const simulateValidSubmit = async (name = faker.name.findName(), email = faker.internet.email(),
  password = faker.internet.password()): Promise<void> => {
  populateField('name', name)
  populateField('email', email)
  populateField('password', password)
  populateField('passwordConfirmation', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => screen.getByTestId('form'))
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    testStatusForField('name', validationError)
    testStatusForField('email', validationError)
    testStatusForField('password', validationError)
    testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('name')
    testStatusForField('name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('email')
    testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('password')
    testStatusForField('password', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('passwordConfirmation')
    testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    makeSut()
    populateField('name')
    testStatusForField('name')
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    populateField('email')
    testStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    populateField('password')
    testStatusForField('password')
  })

  test('Should show valid password confirmation state if Validation succeeds', () => {
    makeSut()
    populateField('passwordConfirmation')
    testStatusForField('passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    populateField('name')
    populateField('email')
    populateField('password')
    populateField('passwordConfirmation')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(name, email, password)
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  test('Should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new Error()
    error.message = 'something error'
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })
})
