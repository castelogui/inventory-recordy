import http from "@/http-common";
import ICategory from "@/interfaces/ICategory";

class CategoryDataSrv {
  async getOne(id: string): Promise<any> {
    return await http.get(`/categories/${id}`);
  }
  async getAll(): Promise<any> {
    return await http.get("/categories");
  }
  create(newCategory: ICategory): Promise<any | Error> {
    return http.post("/categories", newCategory);
  }
  async delete(id: string): Promise<any> {
    return await http.delete(`/categories/${id}`);
  }
  async update(id: string, categoryUpdate: ICategory): Promise<any> {
    return await http.put(`/categories/${id}`, categoryUpdate);
  }
}

export default new CategoryDataSrv();
