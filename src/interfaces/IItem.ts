import ICategory from "./ICategory";
import IColor from "./IColor";

export default interface IItem {
  id: string;
  name: string;
  description: string;
  estoque: number;
  status: boolean;
  category_id: string;
  category: ICategory;
  color_id: string;
  color: IColor;
  size: string;
  created_at: Date;
}
