import { CategoryList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/components'
import { AccountModel } from '@/domain/models'
import { LoadCategoriesSpy, DeleteCategorySpy, mockAccountModel } from '@/tests/domain/mocks'
import { AccessDeniedError } from '@/domain/errors'

import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

type Params = {
  loadCategoriesSpy?: LoadCategoriesSpy
  deleteCategorySpy?: DeleteCategorySpy
}

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
  loadCategoriesSpy: LoadCategoriesSpy
  deleteCategorySpy: DeleteCategorySpy
}

const makeSut = ({
  loadCategoriesSpy = new LoadCategoriesSpy(),
  deleteCategorySpy = new DeleteCategorySpy()
}: Params = {}): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/categories'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value ={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <CategoryList
          deleteCategory={deleteCategorySpy}
          loadCategories={loadCategoriesSpy}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    history,
    setCurrentAccountMock,
    loadCategoriesSpy,
    deleteCategorySpy
  }
}

describe('CategoryList Component', () => {
  test('Should go to categories/new on click', () => {
    const { history } = makeSut()
    fireEvent.click(screen.getByTestId('link-new'))
    expect(history.location.pathname).toBe('/categories/new')
    expect(history.length).toBe(2)
  })

  test('Should call LoadCategories', async () => {
    const { loadCategoriesSpy } = makeSut()
    await waitFor(() => screen.getByTestId('categories'))
    expect(screen.queryAllByRole('item').length).toBe(3)
    expect(loadCategoriesSpy.callsCount).toBe(1)
  })

  test('Should logout on AccessDeniedError by LoadCategories', async () => {
    const loadCategoriesSpy = new LoadCategoriesSpy()
    jest.spyOn(loadCategoriesSpy, 'load').mockRejectedValueOnce(new AccessDeniedError())
    const { history, setCurrentAccountMock } = makeSut({ loadCategoriesSpy })
    await waitFor(() => screen.getByTestId('categories'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should set not found if data is empty', async () => {
    const loadCategoriesSpy = new LoadCategoriesSpy()
    loadCategoriesSpy.data = null
    makeSut({ loadCategoriesSpy })
    await waitFor(() => screen.getByTestId('categories'))
    expect(screen.getByTestId('main-error')).toHaveTextContent('Dados não encontrados')
  })

  test('Should go to /categories/update/:id on click edit sector', async () => {
    const { history, loadCategoriesSpy } = makeSut()
    await waitFor(() => screen.getByTestId('categories'))
    const updatedLink = screen.queryAllByRole('link-update')[0]
    fireEvent.click(updatedLink)
    expect(history.location.pathname).toBe(`/categories/update/${loadCategoriesSpy.data.model[0].id}`)
    expect(history.length).toBe(2)
  })

  test('Should present correct number of pages', async () => {
    makeSut()
    await waitFor(() => screen.getByTestId('categories'))
    const numberOfPages = screen.getByTestId('pagination').children[0].querySelectorAll('li').length - 2
    expect(numberOfPages).toBe(1)
  })

  test('Should open dialog on click delete button', async () => {
    makeSut()
    await waitFor(() => screen.getByTestId('categories'))
    fireEvent.click(screen.getAllByRole('open-dialog')[0])
    await waitFor(() => screen.getByTestId('categories'))
    expect(screen.getAllByRole('dialog')[0]).toBeVisible()
  })

  test('Should call DeleteCategory onClick', async () => {
    const { deleteCategorySpy } = makeSut()
    await waitFor(() => screen.getByTestId('categories'))
    fireEvent.click(screen.getAllByRole('open-dialog')[0])
    await waitFor(() => screen.getByTestId('categories'))
    fireEvent.click(screen.getByTestId('action-button'))
    expect(deleteCategorySpy.callsCount).toBe(1)
  })
})
