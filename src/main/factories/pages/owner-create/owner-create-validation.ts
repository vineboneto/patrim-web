import { Validation } from '@/presentation/protocols'
import { ValidationComposite, ValidationBuilder as Builder } from '@/validation/validators'

export const makeOwnerCreateValidation = (): Validation => {
  return ValidationComposite.build([
    ...Builder.field('name').required().build(),
    ...Builder.field('sector').required().build()
  ])
}
