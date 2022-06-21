import http from "@/http-common"
import IMotivo from "@/interfaces/IMotivo";

class MotivosDataSrv {
  getAll(): Promise<any>{
    return http.get('/motivos')
  }
  getOne(codigo: string): Promise<any> {
    return http.get(`/motivo/${codigo}`);
  }
  create(newmotivo: IMotivo): Promise<any> {
    return http.post("/motivo", newmotivo);
  }
  delete(codigo: string): Promise<any> {
    return http.delete(`/motivo/${codigo}`);
  }
  update(codigo: string, motivoUpdate: IMotivo): Promise<any> {
    return http.put(`/motivo/${codigo}`, motivoUpdate);
  }
}

export default new MotivosDataSrv;