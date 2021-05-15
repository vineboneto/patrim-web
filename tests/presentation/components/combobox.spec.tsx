import { FormContext, Combobox, ItemProps } from '@/presentation/components'
import { getValueInput, populateField } from '@/tests/presentation/mocks'

import React from 'react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'

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
        <Combobox name="combobox" placeholder="any" options={options} />
      </Router>
    </FormContext.Provider>
  )
}

describe('ComboBox Component', () => {
  test('Should change value to correct value', () => {
    makeSut()
    populateField('combobox', 'value-3')
    const value = getValueInput('combobox')
    expect(value).toBe('value-3')
  })
})
