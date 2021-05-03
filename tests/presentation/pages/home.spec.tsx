import { Home } from '@/presentation/pages'

import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

const history = createMemoryHistory({ initialEntries: ['/'] })
const makeSut = (): void => {
  render(
    <Router history={history}>
      <Home/>
    </Router>
  )
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
    makeSut()
    const patrimoniesLink = screen.getByTestId('patrimonies-link')
    fireEvent.click(patrimoniesLink)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/patrimonies')
  })

  test('Should go to sectors page', async () => {
    makeSut()
    const sectorsLink = screen.getByTestId('sectors-link')
    fireEvent.click(sectorsLink)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/sectors')
  })

  test('Should go to categories page', async () => {
    makeSut()
    const categoriesLink = screen.getByTestId('categories-link')
    fireEvent.click(categoriesLink)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/categories')
  })

  test('Should go to owners page', async () => {
    makeSut()
    const ownersLink = screen.getByTestId('owners-link')
    fireEvent.click(ownersLink)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/owners')
  })
})
