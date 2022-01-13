import { CustomerRepository } from "../repositories/CustomerRepository";

export class FindCustomerByCpfUseCase {
  constructor(
    private customerRepository: CustomerRepository
  ) { }

  async execute(cpf: string) {
    const customer = this.customerRepository.findByCpf(cpf);
    return customer;
  }
}