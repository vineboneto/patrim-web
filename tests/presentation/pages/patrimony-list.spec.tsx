import { PatrimonyList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/components'
import { LoadPatrimoniesSpy, mockAccountModel } from '@/tests/domain/mocks'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen, waitFor } from '@testing-library/react'

type Params = {
  loadPatrimoniesSpy?: LoadPatrimoniesSpy
}

type SutTypes = {
  loadPatrimoniesSpy: LoadPatrimoniesSpy
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
    loadPatrimoniesSpy
  }
}

describe('PatrimonyList Component', () => {
  test('Should start with initial state', () => {
    makeSut()
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
    expect(screen.getByTestId('owner').children[0].children[1].children[0].getAttribute('value')).toBe('')
    expect(screen.getByTestId('category').children[0].children[1].children[0].getAttribute('value')).toBe('')
    expect(screen.getByTestId('number').children[1].children[0].getAttribute('value')).toBe('')
  })

  test('Should calls LoadPatrimonies', async () => {
    const { loadPatrimoniesSpy } = makeSut()
    await waitFor(() => screen.getByTestId('patrimonies'))
    expect(loadPatrimoniesSpy.callsCount).toBe(1)
  })
})