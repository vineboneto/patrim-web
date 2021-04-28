export interface FieldValidation {
  field: string
  validation (input: object): Error
}
