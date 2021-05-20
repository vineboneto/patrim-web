import { Validation } from '@/presentation/protocols'
import { ValidationComposite, ValidationBuilder as Builder } from '@/validation/validators'

export const makeSectorUpdateValidation = (): Validation => {
  return ValidationComposite.build([
    ...Builder.field('name').required().build()
  ])
}
