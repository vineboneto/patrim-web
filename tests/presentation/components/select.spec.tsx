import { FormContext, Select, ItemProps } from '@/presentation/components'

import React from 'react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { populateFieldSelect } from '../mocks'

const options: ItemProps[] = [
  { value: '1', label: 'value-1' },
  { value: '2', label: 'value-2' },
  { value: '3', label: 'value-3' }
]

const makeSut = (): void => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <FormContext.Provider value={{ state: {}, setState: jest.fn() }}>
      <Router history={history}>
        <Select name="any-select" placeholder="any" options={options} />
      </Router>
    </FormContext.Provider>
  )
}

describe.only('Header Component', () => {
  test('Should change value to correct value', () => {
    makeSut()
    populateFieldSelect('any-select', 2)
    fireEvent.click(screen.getByTestId('any-select'))
    console.log(screen.getByTestId('any-select'))
  })
})
