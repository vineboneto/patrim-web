import { RequiredFieldValidation } from '@/validation/validators'
import { RequiredFieldError } from '@/validation/errors'

const makeSut = (field: string): RequiredFieldValidation => new RequiredFieldValidation(field)

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = makeSut('field')
    const error = sut.validation({
      field: ''
    })
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return null if field is not empty', () => {
    const sut = makeSut('field')
    const error = sut.validation({
      field: 'any_value'
    })
    expect(error).toBe(null)
  })
})
