import { CustomerEntity } from "../../../core/entities/CustomerEntity";

export class CustomerAdapter {
  static create(name: string, last_name: string, rg: string, cpf: string, email: string, date_created: Date, id: string): CustomerEntity {
    return new CustomerEntity(name, last_name, rg, cpf, email, date_created, id);
  }
}