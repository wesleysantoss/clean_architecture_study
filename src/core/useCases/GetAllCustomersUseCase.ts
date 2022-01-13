import { CustomerRepository } from "../repositories/CustomerRepository";

export class GetAllCustomersUseCase {
  constructor(
    private customerRepository: CustomerRepository
  ) { }

  async execute() {
    return this.customerRepository.getAll();
  }
}