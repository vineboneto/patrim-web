import { CompareFieldValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'

const makeSut = (field: string, fieldToCompare: string):
CompareFieldValidation => new CompareFieldValidation(field, fieldToCompare)

describe('CompareFieldValidation', () => {
  test('Should return error is invalid fields', () => {
    const sut = makeSut('field', 'fieldToCompare')
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'other_value'
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return null if valid fields', () => {
    const sut = makeSut('field', 'fieldToCompare')
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_value'
    })
    expect(error).toBeNull()
  })
})
