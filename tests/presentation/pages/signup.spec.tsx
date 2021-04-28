import { SignUp } from '@/presentation/pages'
import { ValidationStub } from '@/tests/presentation/mocks'

import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import faker from 'faker'

type SutTypes = {
  validationStub: ValidationStub
}

type Params = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (params?: Params): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  render(
    <Router history={history}>
      <SignUp validation={validationStub} />
    </Router>
  )
  return {
    validationStub
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
})
