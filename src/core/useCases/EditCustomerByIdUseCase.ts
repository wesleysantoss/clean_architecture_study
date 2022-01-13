import { CustomerRepository } from "../repositories/CustomerRepository";
import { EditCustomerDto } from "./dtos/EditCustomerDto";
import { EmailAlreadyUsedError } from "./errors/EmailAlreadyUsedError";
import { FindCustomerByEmailUseCase } from "./FindCustomerByEmailUseCase";

export class EditCustomerByIdUseCase {
  constructor(
    private customerRepository: CustomerRepository,
    private findCustomerByEmailUseCase: FindCustomerByEmailUseCase
  ) { }

  async execute(id: string, data: EditCustomerDto) {
    const { email, name, last_name, rg } = data;
    const emailAlreadyUsed = await this.findCustomerByEmailUseCase.execute(email);

    if (emailAlreadyUsed) {
      throw new EmailAlreadyUsedError();
    }

    const customerEdited = this.customerRepository.editById(id, name, last_name, rg, email);
    return customerEdited;
  }
}