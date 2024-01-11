import http from "@/http-common";
import IColor from "@/interfaces/IColor";

class ColorDataSrv {
  async getOne(id: string): Promise<any> {
    return await http.get(`/colors/${id}`);
  }
  async getAll(): Promise<any> {
    return await http.get("/colors");
  }
  async create(newColor: IColor): Promise<any | Error> {
    return await http.post("/colors", newColor);
  }
  async delete(id: string): Promise<any> {
    return await http.delete(`/colors/${id}`);
  }
  async update(id: string, colorUpdate: IColor): Promise<any> {
    return await http.put(`/colors/${id}`, colorUpdate);
  }
}

export default new ColorDataSrv();
