import { CreateCustomerUseCase } from "../core/useCases/CreateCustomerUseCase";
import { DeleteCustomerByIdUseCase } from "../core/useCases/DeleteCustomerByIdUseCase";
import { FindCustomerByCpfUseCase } from "../core/useCases/FindCustomerByCpfUseCase";
import { FindCustomerByEmailUseCase } from "../core/useCases/FindCustomerByEmailUseCase";
import { GetAllCustomersUseCase } from "../core/useCases/GetAllCustomersUseCase";
import { CustomerRepositoryMemory } from "../infra/repositories/CustomerRepositoryMemory";

export class CustomerController {
  static async create(name: string, last_name: string, rg: string, cpf: string, email: string) {
    const customerRepositoryMemory = new CustomerRepositoryMemory();
    const findCustomerByEmailUseCase = new FindCustomerByEmailUseCase(customerRepositoryMemory);
    const findCustomerByCpfUseCase = new FindCustomerByCpfUseCase(customerRepositoryMemory);
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepositoryMemory, findCustomerByEmailUseCase, findCustomerByCpfUseCase);

    const customerCreated = await createCustomerUseCase.execute({ name, last_name, rg, cpf, email });

    return customerCreated;
  }

  static async getAll() {
    const customerRepositoryMemory = new CustomerRepositoryMemory();
    const getAllCustomersUseCase = new GetAllCustomersUseCase(customerRepositoryMemory);
    const customers = await getAllCustomersUseCase.execute();

    return customers;
  }

  static async delete(id: string) {
    const customerRepositoryMemory = new CustomerRepositoryMemory();
    const deleteCustomerByIdUseCase = new DeleteCustomerByIdUseCase(customerRepositoryMemory);

    await deleteCustomerByIdUseCase.execute(id);
  }
}