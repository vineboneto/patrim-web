import { MinLengthValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'

const makeSut = (field: string): MinLengthValidation => new MinLengthValidation(field, 5)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut('field')
    const error = sut.validate({ field: 'four' })
    expect(error).toEqual(new InvalidFieldError())
  })
})
