import { PatrimonyList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/components'
import { AccountModel } from '@/domain/models'
import { AccessDeniedError } from '@/domain/errors'
import { getValueInput } from '@/tests/presentation/mocks'
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
  setCurrentAccountMock: (account: AccountModel) => void
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
    setCurrentAccountMock,
    loadPatrimoniesSpy,
    history
  }
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
    expect(loadPatrimoniesSpy.callsCount).toBe(2)
    await waitFor(() => screen.getByTestId('patrimonies'))
    expect(screen.queryAllByRole('item').length).toBe(10)
  })

  test('Should render main error if LoadPatrimonies fails', async () => {
    const loadPatrimoniesSpy = new LoadPatrimoniesSpy()
    const error = new Error()
    error.message = 'something error'
    jest.spyOn(loadPatrimoniesSpy, 'load').mockRejectedValueOnce(error)
    makeSut({ loadPatrimoniesSpy })
    waitFor(() => screen.getByTestId('patrimonies'))
      .then(() => {
        expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
      })
      .catch((error) => console.log(error))
  })

  test('Should logout on AccessDeniedError by LoadPatrimonies', async () => {
    const loadPatrimoniesSpy = new LoadPatrimoniesSpy()
    jest.spyOn(loadPatrimoniesSpy, 'load').mockRejectedValueOnce(new AccessDeniedError())
    const { history, setCurrentAccountMock } = makeSut({ loadPatrimoniesSpy })
    await waitFor(() => screen.getByTestId('patrimonies'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should go to /patrimonies/new on click new patrimony', () => {
    const { history } = makeSut()
    fireEvent.click(screen.getByTestId('link-new'))
    expect(history.location.pathname).toBe('/patrimonies/new')
    expect(history.length).toBe(2)
  })

  test('Should go to /patrimonies/update/:id on click edit patrimony', async () => {
    const { history, loadPatrimoniesSpy } = makeSut()
    await waitFor(() => screen.getByTestId('patrimonies'))
    const updatedLink = screen.queryAllByRole('link-update')[0]
    fireEvent.click(updatedLink)
    expect(history.location.pathname).toBe(`/patrimonies/update/${loadPatrimoniesSpy.model[0].id}`)
    expect(history.length).toBe(2)
  })

  test.only('Should present correct number of pages', async () => {
    makeSut()
    await waitFor(() => screen.getByTestId('patrimonies'))
    const numberOfPages = screen.getByTestId('pagination').children[0].querySelectorAll('li').length - 2
    expect(numberOfPages).toBe(2)
    const page2 = screen.getByTestId('pagination').children[0].children[2]
    fireEvent.click(page2)
    await waitFor(() => screen.getByTestId('patrimonies'))
    expect(page2).toHaveTextContent('2')
  })
})
