export class CpfIncorrectError extends Error {
  constructor() {
    super('CPF Incorreto')
    this.name = 'CpfIncorrectError'
  }
}