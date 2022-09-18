import { group } from "../types/group";
import { item, locationItem, mapItem } from "../types/item";

export function getTodo() {
  let todo: { groups: Array<group>; archivedGroups: Array<group> } = {
    groups: [],
    archivedGroups: [],
  };
  if (typeof window !== "undefined") {
    const strGroups = localStorage.getItem("todo");
    const jsonTodo = JSON.parse(strGroups || "{}");

    if (jsonTodo.groups && jsonTodo.archivedGroups) {
      jsonTodo.groups.forEach((element: group) => {
        todo.groups.push(element);
      });
      jsonTodo.archivedGroups.forEach((element: group) =>{
        todo.archivedGroups.push(element);
      })
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

export function deleteItem(
  item: item | mapItem | locationItem,
  groupName: string,
  location: boolean
) {
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
    } else {
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
          group: group.name,
        });
      });
    });

    return markers;
  }

  return markers;
}

export function setGroupColor(name: string, color: string) {
  if (typeof window !== "undefined") {
    const todo = getTodo();

    todo.groups.map((group) => {
      if (group.name === name) {
        group.color = color;
        return group;
      }

      return group;
    });

    localStorage.setItem("todo", JSON.stringify(todo));
  }
}

export function archiveGroup(name: string) {
  if (typeof window !== "undefined") {
    const todo = getTodo();
    console.log(todo.archivedGroups);
    const archivedGroup = todo.groups.filter(group=> group.name === name)[0];
    
    const groupList = todo.groups.filter(group=> group.name !== name )

    todo.groups = groupList;
    todo.archivedGroups.push(archivedGroup);
    
    localStorage.setItem("todo", JSON.stringify(todo));
  }
}

export function unArchiveGroup(name: string){
 if (typeof window !== "undefined") {
   const todo = getTodo();
   const unArchivedGroup = todo.archivedGroups.filter((group) => group.name === name)[0];

   const archivedGroupList = todo.archivedGroups.filter((group) => group.name !== name);

   todo.archivedGroups = archivedGroupList;
   todo.groups.push(unArchivedGroup);

   localStorage.setItem("todo", JSON.stringify(todo));
 } 
}