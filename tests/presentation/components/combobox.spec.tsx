import { FormContext, Combobox, ItemProps } from '@/presentation/components'
import { getValueInput, populateField } from '@/tests/presentation/mocks'

import React from 'react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'

const options: ItemProps[] = [
  { value: '1', label: 'value-1' },
  { value: '2', label: 'value-2' },
  { value: '3', label: 'value-3' }
]

type SutTypes = {
  state: any
  setState: (state: any) => void
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setState = jest.fn()
  const state = {
    combobox: ''
  }
  render(
    <FormContext.Provider value={{ state, setState }}>
      <Router history={history}>
        <Combobox name="combobox" placeholder="any" options={options} />
      </Router>
    </FormContext.Provider>
  )
  return {
    state,
    setState
  }
}

describe('ComboBox Component', () => {
  test('Should change value to correct value', () => {
    makeSut()
    populateField('combobox', 'value-3')
    const value = getValueInput('combobox')
    expect(value).toBe('value-3')
  })

  test('Should call setState with correct value', async () => {
    const { state, setState } = makeSut()
    populateField('combobox', 'value-3')
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getByRole('option'))
    expect(setState).toHaveBeenCalledWith({ ...state, combobox: '3' })
  })

  test('Should call setState with correct with option is null', async () => {
    const { state, setState } = makeSut()
    populateField('combobox', 'value-3')
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getByRole('option'))
    populateField('combobox', '')
    expect(setState).toHaveBeenCalledWith({ ...state, combobox: undefined })
  })
})
