import { CreateCustomerUseCase } from "../../core/useCases/CreateCustomerUseCase"
import { FindCustomerByEmailUseCase } from "../../core/useCases/FindCustomerByEmailUseCase";
import { FindCustomerByCpfUseCase } from "../../core/useCases/FindCustomerByCpfUseCase";
import { CreateCustomerDto } from "../../core/useCases/dtos/CreateCustomerDto";
import { CustomerRepositoryMemory } from "../../infra/repositories/CustomerRepositoryMemory";
import { GetAllCustomersUseCase } from "../../core/useCases/GetAllCustomersUseCase";

describe('tests for get the customers', () => {
  let mockDataDto: CreateCustomerDto;

  beforeAll(() => {
    mockDataDto = {
      name: 'Wesley',
      email: 'wessleysanttos@live.com.br',
      cpf: '123.111.123-84',
      last_name: 'Santana',
      rg: '12.321.123-X'
    };
  })

  it('create two customers and get all', async () => {
    const customerRepositoryMemory = new CustomerRepositoryMemory();
    const findCustomerByEmailUseCase = new FindCustomerByEmailUseCase(customerRepositoryMemory);
    const findCustomerByCpfUseCase = new FindCustomerByCpfUseCase(customerRepositoryMemory);
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepositoryMemory, findCustomerByEmailUseCase, findCustomerByCpfUseCase);

    const getAllCustomersUseCase = new GetAllCustomersUseCase(customerRepositoryMemory);

    await createCustomerUseCase.execute(mockDataDto);
    await createCustomerUseCase.execute({ ...mockDataDto, email: 'wes@live.com', cpf: '222.321.123-84' });

    const customers = await getAllCustomersUseCase.execute();

    expect(customers?.length).toBe(2);
  })
})