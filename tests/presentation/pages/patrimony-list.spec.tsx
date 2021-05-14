import { PatrimonyList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/components'
import { mockAccountModel } from '@/tests/domain/mocks'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen } from '@testing-library/react'

const makeSut = (): void => {
  const history = createMemoryHistory({ initialEntries: ['/patrimonies/new'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <PatrimonyList />
      </Router>
    </ApiContext.Provider>
  )
}

describe.only('PatrimonyList Component', () => {
  test('Should start with initial state', () => {
    makeSut()
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
    expect(screen.getByTestId('owner').children[0].children[1].children[0].getAttribute('value')).toBe('')
    expect(screen.getByTestId('category').children[0].children[1].children[0].getAttribute('value')).toBe('')
    expect(screen.getByTestId('number').children[1].children[0].getAttribute('value')).toBe('')
  })
})
