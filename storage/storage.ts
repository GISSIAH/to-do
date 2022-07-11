import {group} from "../types/group"

export function getTodo(): { groups: Array<group> } {
  let todo: { groups: Array<group> } = {
    groups: [],
  };
  if (typeof window !== "undefined") {
    const strGroups = localStorage.getItem("todo");
    const jsonTodo = JSON.parse(strGroups || "{}");

    jsonTodo.groups.forEach((element: group) => {
      todo.groups.push(element);
    });
  }
  return todo;
}

export const addGroup = (group: { name: string; items: Array<string> }) => {
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
