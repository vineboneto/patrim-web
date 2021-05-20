import { OwnerList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/components'
import { AccountModel } from '@/domain/models'
import { LoadOwnersSpy, DeleteOwnerSpy, mockAccountModel } from '@/tests/domain/mocks'
import { AccessDeniedError } from '@/domain/errors'

import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

type Params = {
  loadOwnersSpy?: LoadOwnersSpy
  deleteOwnerSpy?: DeleteOwnerSpy
}

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
  loadOwnersSpy: LoadOwnersSpy
  deleteOwnerSpy: DeleteOwnerSpy
}

const makeSut = ({
  loadOwnersSpy = new LoadOwnersSpy(),
  deleteOwnerSpy = new DeleteOwnerSpy()
}: Params = {}): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/owners'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value ={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <OwnerList
          deleteOwner={deleteOwnerSpy}
          loadOwners={loadOwnersSpy}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    history,
    setCurrentAccountMock,
    loadOwnersSpy,
    deleteOwnerSpy
  }
}

describe('OwnerList Component', () => {
  test('Should go to owners/new on click', () => {
    const { history } = makeSut()
    fireEvent.click(screen.getByTestId('link-new'))
    expect(history.location.pathname).toBe('/owners/new')
    expect(history.length).toBe(2)
  })

  test('Should call LoadOwners', async () => {
    const { loadOwnersSpy } = makeSut()
    await waitFor(() => screen.getByTestId('owners'))
    expect(screen.queryAllByRole('item').length).toBe(3)
    expect(loadOwnersSpy.callsCount).toBe(1)
  })

  test('Should logout on AccessDeniedError by LoadOwners', async () => {
    const loadOwnersSpy = new LoadOwnersSpy()
    jest.spyOn(loadOwnersSpy, 'load').mockRejectedValueOnce(new AccessDeniedError())
    const { history, setCurrentAccountMock } = makeSut({ loadOwnersSpy })
    await waitFor(() => screen.getByTestId('owners'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should set not found if data is empty', async () => {
    const loadOwnersSpy = new LoadOwnersSpy()
    loadOwnersSpy.data = null
    makeSut({ loadOwnersSpy })
    await waitFor(() => screen.getByTestId('owners'))
    expect(screen.getByTestId('main-error')).toHaveTextContent('Dados não encontrados')
  })

  test('Should go to /owners/update/:id on click edit sector', async () => {
    const { history, loadOwnersSpy } = makeSut()
    await waitFor(() => screen.getByTestId('owners'))
    const updatedLink = screen.queryAllByRole('link-update')[0]
    fireEvent.click(updatedLink)
    expect(history.location.pathname).toBe(`/owners/update/${loadOwnersSpy.data.model[0].id}`)
    expect(history.length).toBe(2)
  })

  test('Should present correct number of pages', async () => {
    makeSut()
    await waitFor(() => screen.getByTestId('owners'))
    const numberOfPages = screen.getByTestId('pagination').children[0].querySelectorAll('li').length - 2
    expect(numberOfPages).toBe(1)
  })

  test('Should open dialog on click delete button', async () => {
    makeSut()
    await waitFor(() => screen.getByTestId('owners'))
    fireEvent.click(screen.getAllByRole('open-dialog')[0])
    await waitFor(() => screen.getByTestId('owners'))
    expect(screen.getAllByRole('dialog')[0]).toBeVisible()
  })

  test('Should call DeleteOwner onClick', async () => {
    const { deleteOwnerSpy } = makeSut()
    await waitFor(() => screen.getByTestId('owners'))
    fireEvent.click(screen.getAllByRole('open-dialog')[0])
    await waitFor(() => screen.getByTestId('owners'))
    fireEvent.click(screen.getByTestId('action-button'))
    expect(deleteOwnerSpy.callsCount).toBe(1)
  })
})
