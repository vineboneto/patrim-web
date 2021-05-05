import { PatrimonyCreate } from '@/presentation/pages'
import { ApiContext } from '@/presentation/components'
import {
  populateField,
  populateFieldSelect,
  testStatusForField,
  testStatusForFieldSelect,
  ValidationStub
} from '@/tests/presentation/mocks'
import { AddPatrimonySpy, mockAccountModel } from '@/tests/domain/mocks'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import faker from 'faker'

type Params = {
  validationError: string
}

type SutTypes = {
  validationStub: ValidationStub
  addPatrimonySpy: AddPatrimonySpy
}

const makeSut = (params?: Params): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/patrimonies/new'] })
  const addPatrimonySpy = new AddPatrimonySpy()
  const setCurrentAccountMock = jest.fn()
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <PatrimonyCreate
          addPatrimony={addPatrimonySpy}
          validation={validationStub}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    validationStub,
    addPatrimonySpy
  }
}

const simulateValidSubmit = async (number = faker.datatype.number().toString(), brand = faker.random.word(),
  owner = faker.datatype.number().toString(), category = faker.datatype.number().toString()): Promise<void> => {
  populateField('number', number)
  populateField('brand', brand)
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

  test('Should enable submit button if form is valid', () => {
    makeSut()
    populateField('number')
    populateField('brand')
    populateFieldSelect('owner')
    populateFieldSelect('category')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call AddPatrimony with correct values', async () => {
    const { addPatrimonySpy } = makeSut()
    const number = faker.datatype.number().toString()
    const brand = faker.random.word()
    const category = faker.datatype.number({ min: 1, max: 3 })
    const owner = faker.datatype.number({ min: 1, max: 3 })
    await simulateValidSubmit(number, brand, owner.toString(), category.toString())
    expect(addPatrimonySpy.params).toEqual({
      number,
      brand,
      categoryId: category,
      ownerId: owner
    })
  })
})
