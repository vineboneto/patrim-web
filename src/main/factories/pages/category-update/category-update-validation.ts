import { Validation } from '@/presentation/protocols'
import { ValidationComposite, ValidationBuilder as Builder } from '@/validation/validators'

export const makeCategoryUpdateValidation = (): Validation => {
  return ValidationComposite.build([
    ...Builder.field('name').required().build()
  ])
}
