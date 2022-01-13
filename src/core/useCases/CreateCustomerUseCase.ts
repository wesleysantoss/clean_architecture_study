import { CustomerEntity } from "../entities/CustomerEntity";
import { CustomerRepository } from "../repositories/CustomerRepository";
import { CreateCustomerDto } from "./dtos/CreateCustomerDto";
import { CpfAlreadyUsedError } from "./errors/CpfAlreadyUsedError";
import { EmailAlreadyUsedError } from "./errors/EmailAlreadyUsedError";
import { FindCustomerByCpfUseCase } from "./FindCustomerByCpfUseCase";
import { FindCustomerByEmailUseCase } from "./FindCustomerByEmailUseCase";

export class CreateCustomerUseCase {
  constructor(
    private customerRepository: CustomerRepository,
    private findCustomerByEmailUseCase: FindCustomerByEmailUseCase,
    private findCustomerByCpfUseCase: FindCustomerByCpfUseCase
  ) { }

  async execute(data: CreateCustomerDto): Promise<CustomerEntity> {
    const { name, last_name, rg, cpf, email } = data;

    const customerExistsEmail = await this.findCustomerByEmailUseCase.execute(email);
    if (customerExistsEmail) {
      throw new EmailAlreadyUsedError();
    }

    const customerExistsCpf = await this.findCustomerByCpfUseCase.execute(cpf);
    if (customerExistsCpf) {
      throw new CpfAlreadyUsedError();
    }

    const customerEntity = new CustomerEntity(name, last_name, rg, cpf, email);

    const date_created_format = customerEntity.date_created.toDateString();
    const customer = await this.customerRepository.save(
      customerEntity.name,
      customerEntity.last_name,
      customerEntity.rg,
      customerEntity.cpf,
      customerEntity.email,
      date_created_format,
      customerEntity.id
    );

    return customer;
  }
}