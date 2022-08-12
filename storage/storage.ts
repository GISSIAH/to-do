import { group } from "../types/group";
import { item, locationItem ,mapItem} from "../types/item";



export function getTodo(): { groups: Array<group> } {
  let todo: { groups: Array<group> } = {
    groups: [],
  };
  if (typeof window !== "undefined") {
    const strGroups = localStorage.getItem("todo");
    const jsonTodo = JSON.parse(strGroups || "{}");

    if (jsonTodo.groups) {
      jsonTodo.groups.forEach((element: group) => {
        todo.groups.push(element);
      });
    }
  }
  return todo;
}

export const addGroup = (group: group) => {
  if (typeof window !== "undefined") {
    let todo = getTodo();
    if (todo.groups.length == 0) {
      todo.groups = [];
      todo.groups.push(group);
      localStorage.setItem("todo", JSON.stringify(todo));
    } else {
      todo.groups.push(group);
      localStorage.setItem("todo", JSON.stringify(todo));
    }
  }
};

export function deleteGroup(name: string) {
  if (typeof window !== "undefined") {
    const todo = getTodo();

    const newGroups = todo.groups.filter((group) => group.name !== name);

    todo.groups = newGroups;

    localStorage.setItem("todo", JSON.stringify(todo));
  }
}

export function addItem(item: string, groupName: string) {
  if (typeof window !== "undefined") {
    const todo = getTodo();

    todo.groups.forEach((group) => {
      if (group.name === groupName) {
        group.items.push({ title: item, date: new Date() });
      }
    });

    localStorage.setItem("todo", JSON.stringify(todo));
  }
}

export function addLocationItem(item: locationItem, groupName: string) {
  if (typeof window !== "undefined") {
    const todo = getTodo();

    todo.groups.forEach((group) => {
      if (group.name === groupName) {
        group.locationItems.push(item);
      }
    });

    localStorage.setItem("todo", JSON.stringify(todo));
  }
}

export function deleteItem(item: item | mapItem | locationItem, groupName: string, location: boolean) {
  if (typeof window !== "undefined") {
    const todo = getTodo();

    let tempGroup = todo.groups.filter((group) => group.name == groupName);
    console.log(tempGroup);

    if (location) {
      const newItems = tempGroup[0].locationItems.filter(
        (itemArr) => itemArr.title !== item.title
      );
      console.log(newItems);
      
      todo.groups.map((group) =>
        group.name === groupName ? (group.locationItems = newItems) : group
      );
      localStorage.setItem("todo", JSON.stringify(todo));
    } 
    else {
      const newItems = tempGroup[0].items.filter(
        (itemArr) => itemArr.title !== item.title
      );
      todo.groups.map((group) =>
        group.name === groupName ? (group.items = newItems) : group
      );
      localStorage.setItem("todo", JSON.stringify(todo));
    }
  }
}

export function pinGroup(groupName: string) {
  if (typeof window !== "undefined") {
    const todo = getTodo();

    let newTodoGroups = todo.groups.map((group) =>
      group.name === groupName
        ? { ...group, pinned: true }
        : { ...group, pinned: false }
    );

    todo.groups = newTodoGroups;
    localStorage.setItem("todo", JSON.stringify(todo));
  }
}

export function getLocationItems(): Array<mapItem> {
  var markers: Array<mapItem> = [];
  if (typeof window !== "undefined") {
    const todo = getTodo();

    todo.groups.forEach((group) => {
      group.locationItems.forEach((loc) => {
        markers.push({
          ...loc,
          group: group.name
        });
      });
    });

    return markers;
  }

  return markers;
}
