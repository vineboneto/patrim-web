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
    const styles = screen.getByTestId('dashboard').children[0].getAttribute('style').split(';')
    const visibly = styles[0].split(':')
    const valueVisibly = visibly[1].trim()
    expect(valueVisibly).toBe('hidden')
  })

  test('Should open dashboard on click menu', () => {
    makeSut()
    fireEvent.click(screen.getByTestId('menu'))
    const dashboard = screen.getByTestId('dashboard')
    expect(dashboard).toBeVisible()
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
})
