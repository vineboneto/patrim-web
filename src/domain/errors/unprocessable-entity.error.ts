export class UnprocessableEntityError extends Error {
  constructor (field: string, value: string) {
    super(`Este ${field}: ${value} já existe!`)
    this.name = 'UnexpectedError'
  }
}
