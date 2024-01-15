import IItem from "./IItem";
import ITypeMovement from "./ITypeMovement";

export default interface IMovement {
  id: string;
  description: string;
  quantity: number;
  type_movement_id: string;
  type_movement: ITypeMovement;
  item_id: string;
  item: IItem;
  item_estoque: number;
  item_estoque_ant: number;
  created_at: Date;
  updated_at: Date;
}
