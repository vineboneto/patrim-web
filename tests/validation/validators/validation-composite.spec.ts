import { ValidationComposite } from '@/validation/validators'
import { FieldValidationSpy } from '@/tests/validation/mocks'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [new FieldValidationSpy(fieldName), new FieldValidationSpy(fieldName)]
  const sut = ValidationComposite.build(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if validation fails', () => {
    const { sut, fieldValidationsSpy } = makeSut('email')
    const errorMessage = 'any_error_message'
    fieldValidationsSpy[1].error = new Error(errorMessage)
    const error = sut.validate('email', { email: 'invalid_email' })
    expect(error).toBe(errorMessage)
  })

  test('Should return first error found', () => {
    const { sut, fieldValidationsSpy } = makeSut('email')
    const errorMessage1 = 'erro_message_1'
    fieldValidationsSpy[0].error = new Error(errorMessage1)
    fieldValidationsSpy[1].error = new Error('other_error')
    const error = sut.validate('email', { email: 'invalid_email' })
    expect(error).toBe(errorMessage1)
  })
})
