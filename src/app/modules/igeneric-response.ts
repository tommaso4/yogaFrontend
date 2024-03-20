import { IAsana } from "./IAsana";

export interface IGenericResponse {
  dateTime:string;
  message:string;
  response:IAsana;
}
