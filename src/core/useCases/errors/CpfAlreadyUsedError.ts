export class CpfAlreadyUsedError extends Error {
  constructor() {
    super('CPF já utilizado no sistema')
    this.name = 'CpfAlreadyUsedError'
  }
}