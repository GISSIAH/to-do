import { item, locationItem } from "./item";
export interface group {
  name: string;
  items: Array<item>;
  locationItems: Array<locationItem>
  pinned: boolean;
}