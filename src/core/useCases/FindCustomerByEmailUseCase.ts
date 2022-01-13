import { CustomerRepository } from "../repositories/CustomerRepository";

export class FindCustomerByEmailUseCase {
  constructor(
    private customerRespository: CustomerRepository
  ) { }

  async execute(email: string) {
    const customer = this.customerRespository.findByEmail(email);
    return customer;
  }
}