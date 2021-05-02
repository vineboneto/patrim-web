import { Home } from '@/presentation/pages'

import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen } from '@testing-library/react'
import React from 'react'

const history = createMemoryHistory({ initialEntries: ['/'] })
const makeSut = (): void => {
  render(
    <Router history={history}>
      <Home
      />
    </Router>
  )
}

describe('Home Component', () => {
  test('Should start with initial state', () => {
    makeSut()
    const styles = screen.queryByTestId('dashboard').children[0].getAttribute('style').split(';')
    const visibly = styles[0].split(':')
    const propertyVisibly = visibly[1].trim()
    expect(propertyVisibly).toBe('hidden')
  })
})
