import { LoadContext } from '@/presentation/components'
import { Pagination } from '@/presentation/pages/patrimony-list/components'

import React from 'react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'

type SutTypes = {
  state: any
  setState: (state: any) => void
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setState = jest.fn()
  const state = {
    skip: 0,
    take: 9,
    totalPage: 2,
    currentPage: 1
  }
  render(
    <LoadContext.Provider value={{ state, setState }}>
      <Router history={history}>
        <Pagination />
      </Router>
    </LoadContext.Provider>
  )
  return {
    state,
    setState
  }
}

describe('Pagination Component', () => {
  test('Should call setState with correct value', async () => {
    const { state, setState } = makeSut()
    const button = screen.getByTestId('pagination').querySelectorAll('button')[2]
    fireEvent.click(button)
    expect(setState).toHaveBeenCalledWith({ ...state, skip: 9, currentPage: 2 })
  })
})
