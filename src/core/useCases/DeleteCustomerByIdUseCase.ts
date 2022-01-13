import { CustomerRepository } from "../repositories/CustomerRepository";

export class DeleteCustomerByIdUseCase {
  constructor(
    private customerRepository: CustomerRepository
  ) { }

  async execute(id: string) {
    return this.customerRepository.deleteById(id);
  }
}