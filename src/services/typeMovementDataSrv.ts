import http from "@/http-common";
import ITypeMovement from "@/interfaces/ITypeMovement";

class TypeMovementDataSrv {
  async getOne(id: string): Promise<any> {
    return await http.get(`/typemovement/${id}`);
  }
  async getAll(): Promise<any> {
    return await http.get("/typemovement");
  }
  async create(newTypeMovement: ITypeMovement): Promise<any | Error> {
    return await http.post("/typemovement", newTypeMovement);
  }
  async delete(id: string): Promise<any> {
    return await http.delete(`/typemovement/${id}`);
  }
  async update(id: string, typeMovementUpdate: ITypeMovement): Promise<any> {
    return await http.put(`/typemovement/${id}`, typeMovementUpdate);
  }
}

export default new TypeMovementDataSrv();
