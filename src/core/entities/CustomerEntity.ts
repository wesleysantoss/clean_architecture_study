import { CpfIncorrectError } from "./errors/CpfIncorrectError";
import { EmailIncorrectError } from "./errors/EmailIncorrectError";

export class CustomerEntity {
  public readonly id: string;
  public name: string;
  public last_name: string;
  public rg: string;
  public cpf: string;
  public email: string;
  public date_created: Date;

  constructor(name: string, last_name: string, rg: string, cpf: string, email: string, date_created?: Date, id?: string) {
    this.name = name;
    this.last_name = last_name;
    this.rg = rg;
    this.cpf = this.validateCpf(cpf);
    this.email = this.validateEmail(email);
    this.date_created = date_created === undefined ? new Date() : date_created;
    this.id = id === undefined ? String(Math.random() * 100) : id;
  }

  private validateEmail(email: string) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email.toLowerCase())) throw new EmailIncorrectError();
    return email;
  }

  private validateCpf(cpf: string) {
    const regex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
    if (!regex.test(cpf.toLowerCase())) throw new CpfIncorrectError()
    return cpf;
  }
}