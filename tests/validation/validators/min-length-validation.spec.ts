import { MinLengthValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'

const makeSut = (field: string): MinLengthValidation => new MinLengthValidation(field, 5)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut('field')
    const error = sut.validate({ field: 'four' })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return nul if value is valid', () => {
    const sut = makeSut('field')
    const error = sut.validate({ field: 'seven' })
    expect(error).toBeNull()
  })

  test('Should return null if field does not exists in schema', () => {
    const sut = makeSut('field')
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toBeNull()
  })
})
