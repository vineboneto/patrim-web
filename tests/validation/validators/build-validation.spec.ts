import {
  ValidationBuilder as sut,
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
  CompareFieldValidation
} from '@/validation/validators'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const validations = sut.field('email').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('email')])
  })

  test('Should return EmailValidation', () => {
    const validations = sut.field('email').email().build()
    expect(validations).toEqual([new EmailValidation('email')])
  })

  test('Should return MinLengthValidation', () => {
    const validations = sut.field('password').min(5).build()
    expect(validations).toEqual([new MinLengthValidation('password', 5)])
  })

  test('Should return CompareFieldsValidation', () => {
    const validations = sut.field('password').sameAs('passwordConfirmation').build()
    expect(validations).toEqual([new CompareFieldValidation('password', 'passwordConfirmation')])
  })

  test('Should return a list validations', () => {
    const validations = sut.field('email').required().min(5).email().build()
    expect(validations).toEqual([
      new RequiredFieldValidation('email'),
      new MinLengthValidation('email', 5),
      new EmailValidation('email')
    ])
  })
})
