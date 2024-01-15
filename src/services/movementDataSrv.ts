import http from "@/http-common";
import IMovement from "@/interfaces/IMovement";

class MovementDataSrv {
  async getOne(id: string): Promise<any> {
    return await http.get(`/movements/${id}`);
  }
  async getAll(): Promise<any> {
    return await http.get("/movements");
  }
  async create(newMovement: IMovement): Promise<any | Error> {
    return await http.post("/movements", newMovement);
  }
  async delete(id: string): Promise<any> {
    return await http.delete(`/movements/${id}`);
  }
  async update(id: string, movementUpdate: IMovement): Promise<any> {
    return await http.put(`/movements/${id}`, movementUpdate);
  }
}

export default new MovementDataSrv();
