import { PatrimonyCreate } from '@/presentation/pages'
import { ApiContext } from '@/presentation/components'
import {
  populateField,
  populateFieldSelect,
  testStatusForField,
  testStatusForFieldSelect,
  ValidationStub
} from '@/tests/presentation/mocks'
import { mockAccountModel } from '@/tests/domain/mocks'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen } from '@testing-library/react'
import faker from 'faker'

type Params = {
  validationError: string
}

type SutTypes = {
  validationStub: ValidationStub
}

const makeSut = (params?: Params): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/patrimonies/new'] })
  const setCurrentAccountMock = jest.fn()
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <PatrimonyCreate
          validation={validationStub}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    validationStub
  }
}

describe('PatrimonyCreate Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
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
})