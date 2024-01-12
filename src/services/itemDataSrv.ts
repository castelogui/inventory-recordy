import http from "@/http-common";
import IItem from "@/interfaces/IItem";

class CategoryDataSrv {
  async getOne(id: string): Promise<any> {
    return await http.get(`/items/${id}`);
  }
  async getAll(): Promise<any> {
    return await http.get("/items");
  }
  create(newItem: IItem): Promise<any | Error> {
    return http.post("/items", newItem);
  }
  async delete(id: string): Promise<any> {
    return await http.delete(`/items/${id}`);
  }
  async update(id: string, itemUpdate: IItem): Promise<any> {
    return await http.put(`/items/${id}`, itemUpdate);
  }
}

export default new CategoryDataSrv();
