export class UnprocessableEntityError extends Error {
  constructor (field: string) {
    super(`Este ${field} já existe!`)
    this.name = 'UnexpectedError'
  }
}
