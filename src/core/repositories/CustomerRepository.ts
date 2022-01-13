import { CustomerEntity } from "../entities/CustomerEntity";

export interface CustomerRepository {
  save(name: string, last_name: string, rg: string, cpf: string, email: string, date_created: string, id: string): Promise<CustomerEntity>;
  findByEmail(email: string): Promise<CustomerEntity | undefined>;
  findByCpf(cpf: string): Promise<CustomerEntity | undefined>;
  getAll(): Promise<CustomerEntity[] | undefined>;
  deleteById(id: string): Promise<boolean>;
  editById(id: string, name: string, last_name: string, rg: string, email: string): Promise<CustomerEntity>;
}