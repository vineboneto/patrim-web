import { PatrimonyList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/components'
import { LoadPatrimoniesSpy, mockAccountModel } from '@/tests/domain/mocks'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

type Params = {
  loadPatrimoniesSpy?: LoadPatrimoniesSpy
}

type SutTypes = {
  loadPatrimoniesSpy: LoadPatrimoniesSpy
  history: MemoryHistory
}

const makeSut = ({
  loadPatrimoniesSpy = new LoadPatrimoniesSpy()
}: Params = {}): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/patrimonies/new'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <PatrimonyList loadPatrimonies={loadPatrimoniesSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    loadPatrimoniesSpy,
    history
  }
}

const getValueInput = (fieldName: string): string => {
  return screen.getByTestId(fieldName).children[1].children[0].getAttribute('value')
}

describe('PatrimonyList Component', () => {
  test('Should start with initial state', () => {
    makeSut()
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
    expect(getValueInput('owner')).toBe('')
    expect(getValueInput('category')).toBe('')
    expect(getValueInput('number')).toBe('')
  })

  test('Should calls LoadPatrimonies', async () => {
    const { loadPatrimoniesSpy } = makeSut()
    await waitFor(() => screen.getByTestId('patrimonies'))
    expect(loadPatrimoniesSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByTestId('patrimonies'))
    expect(screen.queryAllByRole('item').length).toBe(3)
  })

  test('Should go to /patrimonies/new on click new patrimony', () => {
    const { history } = makeSut()
    fireEvent.click(screen.getByTestId('link-new'))
    expect(history.location.pathname).toBe('/patrimonies/new')
    expect(history.length).toBe(2)
  })
})
