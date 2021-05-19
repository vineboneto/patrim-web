export class LinkedDataError extends Error {
  constructor (name: string) {
    super(`Este ${name} possui dados vinculados!`)
    this.name = 'LinkedDataError'
  }
}
