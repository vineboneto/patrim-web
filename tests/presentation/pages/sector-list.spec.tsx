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

  test('Should call LoadSectors', () => {
    const { loadSectorsSpy } = makeSut()
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
})
