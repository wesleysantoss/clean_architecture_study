import { CreateCustomerUseCase } from "../../core/useCases/CreateCustomerUseCase"
import { FindCustomerByEmailUseCase } from "../../core/useCases/FindCustomerByEmailUseCase";
import { FindCustomerByCpfUseCase } from "../../core/useCases/FindCustomerByCpfUseCase";
import { CustomerRepositoryMemory } from "../../infra/repositories/CustomerRepositoryMemory";
import { DeleteCustomerByIdUseCase } from "../../core/useCases/DeleteCustomerByIdUseCase";

describe('tests for delete customer', () => {
  it('create a customer and delete', async () => {
    const customerRepositoryMemory = new CustomerRepositoryMemory();
    const findCustomerByEmailUseCase = new FindCustomerByEmailUseCase(customerRepositoryMemory);
    const findCustomerByCpfUseCase = new FindCustomerByCpfUseCase(customerRepositoryMemory);
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepositoryMemory, findCustomerByEmailUseCase, findCustomerByCpfUseCase);
    const deleteCustomerByIdUseCase = new DeleteCustomerByIdUseCase(customerRepositoryMemory);

    const customer = await createCustomerUseCase.execute({
      name: 'Wesley',
      last_name: 'Santana',
      email: 'wessleysanttos@gmail.com.br',
      cpf: '123.998.123-84',
      rg: '12.321.123-X'
    });

    const customerDeleted = await deleteCustomerByIdUseCase.execute(customer.id);
    const customerSearch = await findCustomerByCpfUseCase.execute(customer.cpf);

    expect(customerDeleted).toBe(true);
    expect(customerSearch).toBe(undefined);
  })
})