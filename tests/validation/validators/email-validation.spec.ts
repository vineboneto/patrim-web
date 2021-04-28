import { EmailValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'

const makeSut = (field: string): EmailValidation => new EmailValidation(field)

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = makeSut('email')
    const error = sut.validate({
      email: 'invalid_email'
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return null if email is valid', () => {
    const sut = makeSut('email')
    const error = sut.validate({
      email: 'valide@email.com'
    })
    expect(error).toBeNull()
  })

  test('Should return null if email is empty', () => {
    const sut = makeSut('email')
    const error = sut.validate({ email: '' })
    expect(error).toBeFalsy()
  })
})
