import { ValidationBuilder as Builder, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeSignUpValidation = (): Validation => {
  return ValidationComposite.build([
    ...Builder.field('name').required().min(3).build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().min(5).build(),
    ...Builder.field('passwordConfirmation').required().sameAs('password').build()
  ])
}
