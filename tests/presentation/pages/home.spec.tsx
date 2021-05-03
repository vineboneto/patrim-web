import { Home } from '@/presentation/pages'
import { ApiContext } from '@/presentation/components'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/tests/domain/mocks'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen } from '@testing-library/react'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <Home/>
      </Router>
    </ApiContext.Provider>
  )
  return {
    history,
    setCurrentAccountMock
  }
}

describe('Home Component', () => {
  test('Should start with initial state', () => {
    makeSut()
    const dashboard = screen.getByTestId('dashboard')
    expect(dashboard).toBeVisible()
  })

  test('Should close dashboard on click menu', async () => {
    makeSut()
    fireEvent.click(screen.queryByTestId('menu'))
    const dashboardList = screen.getByTestId('dashboard').children[0]
    expect(dashboardList.children).toHaveLength(0)
  })

  test('Should go to patrimonies page', async () => {
    const { history } = makeSut()
    const patrimoniesLink = screen.getByTestId('patrimonies-link')
    fireEvent.click(patrimoniesLink)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/patrimonies')
  })

  test('Should go to sectors page', async () => {
    const { history } = makeSut()
    const sectorsLink = screen.getByTestId('sectors-link')
    fireEvent.click(sectorsLink)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/sectors')
  })

  test('Should go to categories page', async () => {
    const { history } = makeSut()
    const categoriesLink = screen.getByTestId('categories-link')
    fireEvent.click(categoriesLink)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/categories')
  })

  test('Should go to owners page', async () => {
    const { history } = makeSut()
    const ownersLink = screen.getByTestId('owners-link')
    fireEvent.click(ownersLink)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/owners')
  })

  test('Should go to login page on exit', async () => {
    const { history, setCurrentAccountMock } = makeSut()
    const exitLink = screen.getByTestId('exit-link')
    fireEvent.click(exitLink)
    expect(history.length).toBe(1)
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
