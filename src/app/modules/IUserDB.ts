import { IAsana } from "./IAsana";

export interface IUserDB {
  id:number;
  name:string;
  surname:string;
  username:string;
  email:string;
  password:string;
  role:string;
  asana: IAsana[];
}
