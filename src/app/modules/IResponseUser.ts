import { IUserDB } from "./IUserDB";

export interface IResponseUser {
  message: string;
  dateTime: string;
  response: IUserDB
}
