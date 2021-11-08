export const setTodos = (items) => ({
    type: 'SET_TODOS',
    payload: items,
  });

export const addTodos = (items) => ({
    type: 'ADD_TODOS',
    payload: items,
  });


export const removeTodos = (items) => ({
  type: 'REMOVE_TODOS',
  payload: items,
});
export const editTodo = (items) => ({
  type: 'EDIT_ITEM',
  payload: items,
});
