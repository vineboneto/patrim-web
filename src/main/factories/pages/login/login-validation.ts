import { ValidationBuilder as Builder, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeLoginValidation = (): Validation => {
  return ValidationComposite.build([
    ...Builder.field('email').email().required().build(),
    ...Builder.field('password').required().build()
  ])
}
