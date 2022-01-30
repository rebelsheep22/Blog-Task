export class Users {
  id?: string;
  email!: string;
  passwords! : {
    password: string,
    repeatPassword: string
  };
  fullName?:string
  token?: string;
  groups?: string;
  creationDate?: string;
}
