import http from "@/http-common"
import IRegistro from "@/interfaces/IRegistro";

class RegistrosDataSrv {
  getAll(): Promise<any>{
    return http.get('/atrasos')
  }
  getOne(codigo: string): Promise<any> {
    return http.get(`/registro/${codigo}`);
  }
  create(newregistro: IRegistro): Promise<any> {
    return http.post("/registro", newregistro);
  }
  delete(codigo: string): Promise<any> {
    return http.delete(`/registro/${codigo}`);
  }
  update(codigo: string, registroUpdate: IRegistro): Promise<any> {
    return http.put(`/registro/${codigo}`, registroUpdate);
  }
}

export default new RegistrosDataSrv;