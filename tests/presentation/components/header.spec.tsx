import { ApiContext } from '@/presentation/components'
import { User, OpenMenu } from '@/presentation/components/header/components'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/tests/domain/mocks'

import React from 'react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }}>
      <Router history={history}>
        <OpenMenu />
        <User />
      </Router>
    </ApiContext.Provider>
  )
  return {
    history,
    setCurrentAccountMock
  }
}

describe('Header Component', () => {
  test('Should call setCurrentAccount with null', () => {
    const { history, setCurrentAccountMock } = makeSut()
    fireEvent.click(screen.getByTestId('exit-link'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should render username correctly', () => {
    const account = mockAccountModel()
    makeSut(account)
    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })

  test('Should show menu on click', () => {
    makeSut()
    const menu = screen.getByTestId('menu')
    fireEvent.click(menu)
    expect(menu).toBeInTheDocument()
  })

  test('Should go to / on click patrimonies menu', () => {
    const { history } = makeSut()
    fireEvent.click(screen.getByTestId('patrimonies-menu'))
    expect(history.location.pathname).toBe('/')
    expect(history.length).toBe(2)
  })

  test('Should go to /owners on click patrimonies menu', () => {
    const { history } = makeSut()
    fireEvent.click(screen.getByTestId('owners-menu'))
    expect(history.location.pathname).toBe('/owners')
    expect(history.length).toBe(2)
  })

  test('Should go to /sectors on click sectors menu', () => {
    const { history } = makeSut()
    fireEvent.click(screen.getByTestId('sectors-menu'))
    expect(history.location.pathname).toBe('/sectors')
    expect(history.length).toBe(2)
  })

  test('Should go to /categories on click categories menu', () => {
    const { history } = makeSut()
    fireEvent.click(screen.getByTestId('categories-menu'))
    expect(history.location.pathname).toBe('/categories')
    expect(history.length).toBe(2)
  })
})
