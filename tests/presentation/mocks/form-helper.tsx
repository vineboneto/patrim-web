import { fireEvent, screen } from '@testing-library/react'
import faker from 'faker'

export const testStatusForField = (fieldName: string, validationError: string = ''): void => {
  const field = screen.getByTestId(fieldName)
  const input = field.children[1].children[0]
  expect(input).toHaveAttribute('aria-invalid', (validationError !== '').toString())
  expect(field).toHaveProperty('title', validationError)
}

export const testStatusForFieldSelect = (fieldName: string, validationError: string = ''): void => {
  const field = screen.getByTestId(fieldName)
  expect(field).toHaveProperty('title', validationError)
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const field = screen.getByTestId(fieldName)
  const input = field.children[1].children[0]
  fireEvent.input(input, { target: { value } })
}
