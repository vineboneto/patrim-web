import { Validation } from '@/presentation/protocols'
import { ValidationComposite, ValidationBuilder as Builder } from '@/validation/validators'

export const makePatrimonyCreateValidation = (): Validation => {
  return ValidationComposite.build([
    ...Builder.field('number').required().build(),
    ...Builder.field('brand').required().build(),
    ...Builder.field('category').required().build(),
    ...Builder.field('owner').required().build()
  ])
}
