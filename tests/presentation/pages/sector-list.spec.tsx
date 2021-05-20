import { SectorList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/components'
import { AccountModel } from '@/domain/models'

import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { mockAccountModel } from '../../domain/mocks'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/sectors'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value ={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <SectorList />
      </Router>
    </ApiContext.Provider>
  )
  return {
    history,
    setCurrentAccountMock
  }
}

describe('SectorList Component', () => {
  test('Should go to sectors/new on click', () => {
    const { history } = makeSut()
    fireEvent.click(screen.getByTestId('link-new'))
    expect(history.location.pathname).toBe('/sectors/new')
    expect(history.length).toBe(2)
  })
})
