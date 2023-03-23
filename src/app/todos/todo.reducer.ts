import { Todo } from './models/todo.model';
import { Action, createReducer, on } from "@ngrx/store";
import { crear, editar, eliminar, limpiarCompletadas, toggle, toggleAll } from "./todo.actions";

const initialState: Todo[] = [
  new Todo('Salvar el mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Comprar traje de Ironman'),
  new Todo('Robar escudo del capitán América')
];

const _todoReducer = createReducer(initialState,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(toggle, (state, { id }) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo;
      }
    });
  }),
  on(editar, (state, { id, texto }) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          texto
        }
      } else {
        return todo;
      }
    });
  }),
  on(eliminar, (state, { id }) => state.filter(todo => todo.id !== id)),
  on(toggleAll, (state, { completado }) => state.map(todo => { return {...todo, completado}})),
  on(limpiarCompletadas, state => state.filter(todo => !todo.completado))
);

export const todoReducer = (state: Todo[] = initialState, action: Action) => _todoReducer(state, action);
