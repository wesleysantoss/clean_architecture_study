export class EmailIncorrectError extends Error {
  constructor() {
    super('E-mail incorreto')
    this.name = 'EmailIncorrectError'
  }
}