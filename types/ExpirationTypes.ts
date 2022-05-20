import { InventoryTypings } from "../constants";
import { InventoryItemObject } from "./InventoryTypes";

export type Item = {
  item: InventoryItemObject;
  canBeDeleted?: boolean;
  reRender?: boolean;
  dispatch?: () => void;
  type?: InventoryTypings;
};

export type ModalProps = {
  item: InventoryItemObject;
  type: InventoryTypings;
  reRender: any;
  dispatch: any;
  state: any;
};

export type InventoryDisplayProps = {
  inventoryName: string;
  data: InventoryItemObject[];
  renderControl: any;
  type: InventoryTypings;
};
