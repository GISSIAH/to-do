import { item } from "./item";
export interface group {
  name: string;
  items: Array<item>;
  pinned: boolean;
}