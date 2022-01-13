import { CreateCustomerUseCase } from "../../core/useCases/CreateCustomerUseCase"
import { FindCustomerByEmailUseCase } from "../../core/useCases/FindCustomerByEmailUseCase";
import { FindCustomerByCpfUseCase } from "../../core/useCases/FindCustomerByCpfUseCase";
import { CustomerRepositoryMemory } from "../../infra/repositories/CustomerRepositoryMemory";
import { CreateCustomerDto } from "../../core/useCases/dtos/CreateCustomerDto";
import { EditCustomerByIdUseCase } from "../../core/useCases/EditCustomerByIdUseCase";
import { EditCustomerDto } from "../../core/useCases/dtos/EditCustomerDto";
import { EmailAlreadyUsedError } from "../../core/useCases/errors/EmailAlreadyUsedError";

describe('tests for edit a customer', () => {
  let mockDataCreateDto: CreateCustomerDto;
  let mockDataEditDto: EditCustomerDto;

  beforeAll(() => {
    mockDataCreateDto = {
      name: 'Wesley',
      email: 'wessleysanttosssssss@gmail.com.br',
      cpf: '123.321.123-84',
      last_name: 'Santana',
      rg: '12.321.123-X'
    };

    mockDataEditDto = {
      name: 'Weslão',
      email: 'wessleysanttosssssss@gmail.com.br',
      last_name: 'Safadawn',
      rg: '12.321.123-X'
    }
  })

  it('create a customer and edit your email already used', async () => {
    const customerRepositoryMemory = new CustomerRepositoryMemory();
    const findCustomerByEmailUseCase = new FindCustomerByEmailUseCase(customerRepositoryMemory);
    const findCustomerByCpfUseCase = new FindCustomerByCpfUseCase(customerRepositoryMemory);
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepositoryMemory, findCustomerByEmailUseCase, findCustomerByCpfUseCase);
    const editCustomerByIdUseCase = new EditCustomerByIdUseCase(customerRepositoryMemory, findCustomerByEmailUseCase);

    try {
      const customer = await createCustomerUseCase.execute(mockDataCreateDto);
      await editCustomerByIdUseCase.execute(customer.id, mockDataEditDto);
      expect(true).toBe(false);
    } catch (e: any) {
      expect(e).toBeInstanceOf(EmailAlreadyUsedError);
    }
  })

  it('create a customer and edit your email', async () => {
    const customerRepositoryMemory = new CustomerRepositoryMemory();
    const findCustomerByEmailUseCase = new FindCustomerByEmailUseCase(customerRepositoryMemory);
    const findCustomerByCpfUseCase = new FindCustomerByCpfUseCase(customerRepositoryMemory);
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepositoryMemory, findCustomerByEmailUseCase, findCustomerByCpfUseCase);
    const editCustomerByIdUseCase = new EditCustomerByIdUseCase(customerRepositoryMemory, findCustomerByEmailUseCase);

    const customerCreated = await createCustomerUseCase.execute({ ...mockDataCreateDto, email: 'wes@wes.com', cpf: '111.222.123-84' });
    const customerEdited = await editCustomerByIdUseCase.execute(customerCreated.id, { ...mockDataEditDto, email: 'wes@wes.com.br' });
    const customerSearch = await findCustomerByEmailUseCase.execute(customerEdited.email);

    expect(customerCreated?.cpf).toBe(customerSearch?.cpf);
  })
})