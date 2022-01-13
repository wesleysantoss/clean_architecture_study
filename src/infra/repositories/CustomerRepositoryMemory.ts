import { CustomerAdapter } from "./adapters/CustomerAdapter";
import { CustomerEntity } from "../../core/entities/CustomerEntity";
import { CustomerRepository } from "../../core/repositories/CustomerRepository";

export class CustomerRepositoryMemory implements CustomerRepository {
  static customers: any[] = [];

  async save(name: string, last_name: string, rg: string, cpf: string, email: string, date_created: string, id: string): Promise<CustomerEntity> {
    const date_created_format = new Date(date_created);

    CustomerRepositoryMemory.customers.push({ name, last_name, rg, cpf, email, date_created: date_created_format, id });

    return CustomerAdapter.create(name, last_name, rg, cpf, email, date_created_format, id);
  }

  async findByEmail(email_search: string): Promise<CustomerEntity | undefined> {
    const customer = CustomerRepositoryMemory.customers.find(customer => customer.email === email_search);

    if (customer) {
      const { name, last_name, rg, cpf, email, date_created, id } = customer;
      return CustomerAdapter.create(name, last_name, rg, cpf, email, date_created, id);
    }

    return undefined;
  }

  async findByCpf(cpf_search: string): Promise<CustomerEntity | undefined> {
    const customer = CustomerRepositoryMemory.customers.find(customer => customer.cpf === cpf_search);

    if (customer) {
      const { name, last_name, rg, cpf, email, date_created, id } = customer;
      return CustomerAdapter.create(name, last_name, rg, cpf, email, date_created, id);
    }

    return undefined;
  }

  async getAll(): Promise<CustomerEntity[] | undefined> {
    const customers = CustomerRepositoryMemory.customers.map(customer => {
      const { name, last_name, rg, cpf, email, date_created_format: date_created, id } = customer;
      return CustomerAdapter.create(name, last_name, rg, cpf, email, date_created, id);
    });

    return customers;
  }

  async deleteById(id: string): Promise<boolean> {
    const newCustomers = CustomerRepositoryMemory.customers.filter(customer => customer.id !== id);
    CustomerRepositoryMemory.customers = newCustomers;
    return true;
  }

  async editById(id_edit: string, name_edit: string, last_name_edit: string, rg_edit: string, email_edit: string): Promise<CustomerEntity> {
    let indexCustomer = 0;
    const customer = CustomerRepositoryMemory.customers.find((customer, index) => {
      if (customer.id === id_edit) {
        indexCustomer = index;
        return true;
      }
    });

    const customerEdit = { ...customer, name_edit, last_name_edit, rg_edit, email_edit };
    CustomerRepositoryMemory.customers[indexCustomer] = customerEdit;

    const { name, last_name, rg, cpf, email, date_created, id } = customerEdit;
    return CustomerAdapter.create(name, last_name, rg, cpf, email, date_created, id);
  }
}