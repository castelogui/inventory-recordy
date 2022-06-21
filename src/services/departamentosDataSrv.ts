import http from "@/http-common";
import IDepartamento from "@/interfaces/IDepartamento";

class DepartamentosDataSrv {
  getOne(codigo: string): Promise<any> {
    return http.get(`/departamento/${codigo}`);
  }
  getAll(): Promise<any> {
    return http.get("/departamentos");
  }
  create(newDepartamento: IDepartamento): Promise<any> {
    return http.post("/departamento", newDepartamento);
  }
  delete(codigo: string): Promise<any> {
    return http.delete(`/departamento/${codigo}`);
  }
  update(_id: string, departamentoUpdate: any): Promise<any> {
    return http.put(`/departamento/${_id}`, departamentoUpdate);
  }
}

export default new DepartamentosDataSrv();
