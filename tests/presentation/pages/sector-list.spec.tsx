import { SectorList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/components'
import { AccountModel } from '@/domain/models'
import { LoadSectorsSpy, mockAccountModel } from '@/tests/domain/mocks'

import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { AccessDeniedError } from '@/domain/errors'

type Params = {
  loadSectorsSpy?: LoadSectorsSpy
}

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
  loadSectorsSpy: LoadSectorsSpy}

const makeSut = ({
  loadSectorsSpy = new LoadSectorsSpy()
}: Params = {}): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/sectors'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value ={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <SectorList
          loadSectors={loadSectorsSpy}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    history,
    setCurrentAccountMock,
    loadSectorsSpy
  }
}

describe('SectorList Component', () => {
  test('Should go to sectors/new on click', () => {
    const { history } = makeSut()
    fireEvent.click(screen.getByTestId('link-new'))
    expect(history.location.pathname).toBe('/sectors/new')
    expect(history.length).toBe(2)
  })

  test('Should call LoadSectors', async () => {
    const { loadSectorsSpy } = makeSut()
    await waitFor(() => screen.getByTestId('sectors'))
    expect(screen.queryAllByRole('item').length).toBe(10)
    expect(loadSectorsSpy.callsCount).toBe(1)
  })

  test('Should logout on AccessDeniedError by LoadSectors', async () => {
    const loadSectorsSpy = new LoadSectorsSpy()
    jest.spyOn(loadSectorsSpy, 'load').mockRejectedValueOnce(new AccessDeniedError())
    const { history, setCurrentAccountMock } = makeSut({ loadSectorsSpy })
    await waitFor(() => screen.getByTestId('sectors'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should set not found if data is empty', async () => {
    const loadSectorsSpy = new LoadSectorsSpy()
    loadSectorsSpy.data = null
    makeSut({ loadSectorsSpy })
    await waitFor(() => screen.getByTestId('sectors'))
    expect(screen.getByTestId('main-error')).toHaveTextContent('Dados não encontrados')
  })

  test('Should go to /sectors/update/:id on click edit sector', async () => {
    const { history, loadSectorsSpy } = makeSut()
    await waitFor(() => screen.getByTestId('sectors'))
    const updatedLink = screen.queryAllByRole('link-update')[0]
    fireEvent.click(updatedLink)
    expect(history.location.pathname).toBe(`/sectors/update/${loadSectorsSpy.data.model[0].id}`)
    expect(history.length).toBe(2)
  })

  test('Should present correct number of pages', async () => {
    makeSut()
    await waitFor(() => screen.getByTestId('sectors'))
    const numberOfPages = screen.getByTestId('pagination').children[0].querySelectorAll('li').length - 2
    expect(numberOfPages).toBe(1)
  })

  test('Should open dialog on click delete button', async () => {
    makeSut()
    await waitFor(() => screen.getByTestId('sectors'))
    fireEvent.click(screen.getAllByRole('open-dialog')[0])
    await waitFor(() => screen.getByTestId('sectors'))
    expect(screen.getAllByRole('dialog')[0]).toBeVisible()
  })
})
