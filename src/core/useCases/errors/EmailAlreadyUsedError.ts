export class EmailAlreadyUsedError extends Error {
  constructor() {
    super('E-mail já utilizado no sistema')
    this.name = 'EmailAlreadyUsedError'
  }
}