import IDepartamento from "./IDepartamento";
import IFuncionario from "./IFuncionario";
import IMotivo from "./IMotivo";

export default interface IRegistro {
  _id: string;
  atrasos: [];
  funcionario: IFuncionario;
  departamento: IDepartamento;
  motivo: IMotivo;
}