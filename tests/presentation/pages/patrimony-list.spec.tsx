import { PatrimonyList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/components'
import { AccountModel } from '@/domain/models'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { getValueInput, populateField } from '@/tests/presentation/mocks'
import {
  LoadCategoriesSpy,
  LoadOwnersSpy,
  LoadPatrimoniesSpy,
  LoadPatrimonyByNumberSpy,
  mockAccountModel
} from '@/tests/domain/mocks'
import { LoadPatrimonies } from '@/domain/usecases'

import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

type Params = {
  loadPatrimoniesSpy?: LoadPatrimoniesSpy
  loadOwnersSpy?: LoadOwnersSpy
  loadCategoriesSpy?: LoadCategoriesSpy
  loadPatrimonyByNumberSpy?: LoadPatrimonyByNumberSpy
}

type SutTypes = {
  loadPatrimoniesSpy: LoadPatrimoniesSpy
  loadOwnersSpy: LoadOwnersSpy
  loadCategoriesSpy: LoadCategoriesSpy
  loadPatrimonyByNumberSpy: LoadPatrimonyByNumberSpy
  setCurrentAccountMock: (account: AccountModel) => void
  history: MemoryHistory
}

const makeSut = ({
  loadPatrimoniesSpy = new LoadPatrimoniesSpy(),
  loadOwnersSpy = new LoadOwnersSpy(),
  loadCategoriesSpy = new LoadCategoriesSpy(),
  loadPatrimonyByNumberSpy = new LoadPatrimonyByNumberSpy()
}: Params = {}): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/patrimonies/new'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <PatrimonyList
          loadPatrimonies={loadPatrimoniesSpy}
          loadOwners={loadOwnersSpy}
          loadCategories={loadCategoriesSpy}
          loadPatrimonyByNumber={loadPatrimonyByNumberSpy}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    setCurrentAccountMock,
    loadPatrimoniesSpy,
    loadOwnersSpy,
    loadCategoriesSpy,
    loadPatrimonyByNumberSpy,
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
  test('Should logout on AccessDeniedError by LoadPatrimonies 2', async () => {
    class LoadPatrimoniesSpy2 implements LoadPatrimonies {
      model = []
      params: LoadPatrimonies.Params
      callsCount = 0
      async load (params: LoadPatrimonies.Params): Promise<LoadPatrimonies.Model[]> {
        this.callsCount++
        if (this.callsCount === 2) throw new AccessDeniedError()
        return this.model
      }
    }
    const loadPatrimoniesSpy2 = new LoadPatrimoniesSpy2()
    const { history, setCurrentAccountMock } = makeSut({ loadPatrimoniesSpy: loadPatrimoniesSpy2 })
    await waitFor(() => screen.getByTestId('patrimonies'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should calls LoadOwners', async () => {
    const { loadOwnersSpy } = makeSut()
    await waitFor(() => screen.getByTestId('patrimonies'))
    expect(loadOwnersSpy.callsCount).toBe(1)
  })

  test('Should render main error if LoadOwners fails', async () => {
    const loadOwnersSpy = new LoadOwnersSpy()
    const error = new Error()
    error.message = 'something error'
    jest.spyOn(loadOwnersSpy, 'load').mockRejectedValueOnce(error)
    makeSut({ loadOwnersSpy })
    waitFor(() => screen.getByTestId('patrimonies'))
      .then(() => {
        expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
      })
      .catch((error) => console.log(error))
  })

  test('Should logout on AccessDeniedError by LoadOwners', async () => {
    const loadOwnersSpy = new LoadOwnersSpy()
    jest.spyOn(loadOwnersSpy, 'load').mockRejectedValueOnce(new AccessDeniedError())
    const { history, setCurrentAccountMock } = makeSut({ loadOwnersSpy })
    await waitFor(() => screen.getByTestId('patrimonies'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should calls LoadCategories', async () => {
    const { loadOwnersSpy } = makeSut()
    await waitFor(() => screen.getByTestId('patrimonies'))
    expect(loadOwnersSpy.callsCount).toBe(1)
  })

  test('Should render main error if LoadCategories fails', async () => {
    const loadCategoriesSpy = new LoadCategoriesSpy()
    const error = new Error()
    error.message = 'something error'
    jest.spyOn(loadCategoriesSpy, 'load').mockRejectedValueOnce(error)
    makeSut({ loadCategoriesSpy })
    waitFor(() => screen.getByTestId('patrimonies'))
      .then(() => {
        expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
      })
      .catch((error) => console.log(error))
  })

  test('Should logout on AccessDeniedError by LoadCategories', async () => {
    const loadCategoriesSpy = new LoadCategoriesSpy()
    jest.spyOn(loadCategoriesSpy, 'load').mockRejectedValueOnce(new AccessDeniedError())
    const { history, setCurrentAccountMock } = makeSut({ loadCategoriesSpy })
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

  test('Should present correct number of pages', async () => {
    makeSut()
    await waitFor(() => screen.getByTestId('patrimonies'))
    const numberOfPages = screen.getByTestId('pagination').children[0].querySelectorAll('li').length - 2
    expect(numberOfPages).toBe(2)
    const page2 = screen.getByTestId('pagination').children[0].children[2]
    fireEvent.click(page2)
    await waitFor(() => screen.getByTestId('patrimonies'))
    expect(page2).toHaveTextContent('2')
  })

  test('Should call LoadPatrimonies on failure', async () => {
    const loadPatrimoniesSpy = new LoadPatrimoniesSpy()
    jest.spyOn(loadPatrimoniesSpy, 'load').mockRejectedValueOnce(new UnexpectedError())
    makeSut({ loadPatrimoniesSpy })
    await waitFor(() => screen.getByTestId('patrimonies'))
    fireEvent.click(screen.getByTestId('reload'))
    expect(loadPatrimoniesSpy.callsCount).toBe(3)
    await waitFor(() => screen.getByTestId('patrimonies'))
  })

  test('Should call LoadOwners on failure', async () => {
    const loadOwnersSpy = new LoadOwnersSpy()
    jest.spyOn(loadOwnersSpy, 'load').mockRejectedValueOnce(new UnexpectedError())
    makeSut({ loadOwnersSpy })
    await waitFor(() => screen.getByTestId('patrimonies'))
    fireEvent.click(screen.getByTestId('reload'))
    expect(loadOwnersSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByTestId('patrimonies'))
  })

  test('Should call LoadCategories on failure', async () => {
    const loadCategoriesSpy = new LoadCategoriesSpy()
    jest.spyOn(loadCategoriesSpy, 'load').mockRejectedValueOnce(new UnexpectedError())
    makeSut({ loadCategoriesSpy })
    await waitFor(() => screen.getByTestId('patrimonies'))
    fireEvent.click(screen.getByTestId('reload'))
    expect(loadCategoriesSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByTestId('patrimonies'))
  })

  test('Should call LoadPatrimonyByNumber on submit', async () => {
    const { loadPatrimonyByNumberSpy } = makeSut()
    populateField('number', '666')
    fireEvent.click(screen.getByTestId('submit-button'))
    await waitFor(() => screen.getByTestId('patrimonies'))
    expect(loadPatrimonyByNumberSpy.callsCount).toBe(1)
  })

  test('Should not call LoadPatrimonyByNumber if field number is empty', async () => {
    const { loadPatrimonyByNumberSpy } = makeSut()
    fireEvent.click(screen.getByTestId('submit-button'))
    await waitFor(() => screen.getByTestId('patrimonies'))
    expect(loadPatrimonyByNumberSpy.callsCount).toBe(0)
  })

  test('Should disabled combo box if number is not undefined', async () => {
    makeSut()
    populateField('number', '666')
    expect(screen.getByTestId('owner').children[1].children[0]).toBeDisabled()
    expect(screen.getByTestId('category').children[1].children[0]).toBeDisabled()
  })

  test('Should not setData patrimonies if patrimony not found by LoadPatrimonyByNumber', async () => {
    const { loadPatrimonyByNumberSpy } = makeSut()
    loadPatrimonyByNumberSpy.model = null
    populateField('number', '666')
    fireEvent.click(screen.getByTestId('submit-button'))
    await waitFor(() => screen.getByTestId('patrimonies'))
    const numberOfPages = screen.getByTestId('pagination').children[0].querySelectorAll('li').length - 2
    expect(numberOfPages).toBe(2)
    await waitFor(() => screen.getByTestId('patrimonies'))
    expect(screen.queryAllByRole('item').length).toBe(10)
  })
})
