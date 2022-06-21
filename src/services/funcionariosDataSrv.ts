import http from "@/http-common"
import IFuncionario from "@/interfaces/IFuncionario";

class FunctionariosDataSrv {
  getAll(): Promise<any>{
    return http.get('/funcionarios')
  }
  getOne(codigo: string): Promise<any> {
    return http.get(`/funcionario/${codigo}`);
  }
  create(newFuncionario: IFuncionario): Promise<any> {
    return http.post("/funcionario", newFuncionario);
  }
  delete(codigo: string): Promise<any> {
    return http.delete(`/funcionario/${codigo}`);
  }
  update(_id: string, funcionarioUpdate: IFuncionario): Promise<any> {
    return http.put(`/funcionario/${_id}`, funcionarioUpdate);
  }
}

export default new FunctionariosDataSrv;