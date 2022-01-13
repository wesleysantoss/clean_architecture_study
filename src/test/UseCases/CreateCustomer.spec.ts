import { CreateCustomerUseCase } from "../../core/useCases/CreateCustomerUseCase"
import { FindCustomerByEmailUseCase } from "../../core/useCases/FindCustomerByEmailUseCase";
import { FindCustomerByCpfUseCase } from "../../core/useCases/FindCustomerByCpfUseCase";
import { CreateCustomerDto } from "../../core/useCases/dtos/CreateCustomerDto";
import { CustomerRepositoryMemory } from "../../infra/repositories/CustomerRepositoryMemory";
import { EmailAlreadyUsedError } from "../../core/useCases/errors/EmailAlreadyUsedError";
import { EmailIncorrectError } from "../../core/entities/errors/EmailIncorrectError";
import { CpfIncorrectError } from "../../core/entities/errors/CpfIncorrectError";
import { CpfAlreadyUsedError } from "../../core/useCases/errors/CpfAlreadyUsedError";

describe('tests for create the customers', () => {
  let mockDataDto: CreateCustomerDto;

  beforeAll(() => {
    mockDataDto = {
      name: 'Wesley',
      email: 'wessleysanttos@live.com',
      cpf: '123.321.123-84',
      last_name: 'Santana',
      rg: '12.321.123-X'
    };
  })

  it('should return an error message incorrect email', async () => {
    const customerRepositoryMemory = new CustomerRepositoryMemory();
    const findCustomerByEmailUseCase = new FindCustomerByEmailUseCase(customerRepositoryMemory);
    const findCustomerByCpfUseCase = new FindCustomerByCpfUseCase(customerRepositoryMemory);
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepositoryMemory, findCustomerByEmailUseCase, findCustomerByCpfUseCase);

    try {
      await createCustomerUseCase.execute({ ...mockDataDto, email: 'wes' });
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(EmailIncorrectError);
    }
  })

  it('should return an error message incorrect cpf', async () => {
    const customerRepositoryMemory = new CustomerRepositoryMemory();
    const findCustomerByEmailUseCase = new FindCustomerByEmailUseCase(customerRepositoryMemory);
    const findCustomerByCpfUseCase = new FindCustomerByCpfUseCase(customerRepositoryMemory);
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepositoryMemory, findCustomerByEmailUseCase, findCustomerByCpfUseCase);

    try {
      await createCustomerUseCase.execute({ ...mockDataDto, cpf: '123' });
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(CpfIncorrectError);
    }
  })

  it('should return an error message when insert email repeated', async () => {
    const customerRepositoryMemory = new CustomerRepositoryMemory();
    const findCustomerByEmailUseCase = new FindCustomerByEmailUseCase(customerRepositoryMemory);
    const findCustomerByCpfUseCase = new FindCustomerByCpfUseCase(customerRepositoryMemory);
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepositoryMemory, findCustomerByEmailUseCase, findCustomerByCpfUseCase);

    try {
      await createCustomerUseCase.execute({ ...mockDataDto, email: 'wessssssley@live.com', cpf: '112.321.123-84' });
      await createCustomerUseCase.execute({ ...mockDataDto, email: 'wessssssley@live.com', cpf: '113.321.123-84' });
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(EmailAlreadyUsedError);
    }
  })

  it('should return an error message when insert cpf repeated', async () => {
    const customerRepositoryMemory = new CustomerRepositoryMemory();
    const findCustomerByEmailUseCase = new FindCustomerByEmailUseCase(customerRepositoryMemory);
    const findCustomerByCpfUseCase = new FindCustomerByCpfUseCase(customerRepositoryMemory);
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepositoryMemory, findCustomerByEmailUseCase, findCustomerByCpfUseCase);

    try {
      await createCustomerUseCase.execute({ ...mockDataDto, email: 'wessssssssley@live.com', cpf: '111.321.123-84' });
      await createCustomerUseCase.execute({ ...mockDataDto, email: 'wesssssssssssley@live.com', cpf: '111.321.123-84' });
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(CpfAlreadyUsedError);
    }
  })

  it('should create a new customer and find the customer', async () => {
    const customerRepositoryMemory = new CustomerRepositoryMemory();
    const findCustomerByEmailUseCase = new FindCustomerByEmailUseCase(customerRepositoryMemory);
    const findCustomerByCpfUseCase = new FindCustomerByCpfUseCase(customerRepositoryMemory);
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepositoryMemory, findCustomerByEmailUseCase, findCustomerByCpfUseCase);

    const customerCreated = await createCustomerUseCase.execute(mockDataDto);
    const customerFinded = await findCustomerByEmailUseCase.execute(customerCreated.email);

    expect(customerCreated.name).toEqual(customerFinded?.name);
  })
})