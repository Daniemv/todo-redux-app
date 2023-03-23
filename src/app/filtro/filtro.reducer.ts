import { filtrosValidos, setFiltro } from './filtro.actions';
import { Action, createReducer, on } from "@ngrx/store";

export const initialState: filtrosValidos = 'todas';

const _filtroReducer = createReducer<filtrosValidos, Action>(initialState,
  on(setFiltro, (state, { filtro }) => filtro)
);

export const filtroReducer = (state: filtrosValidos = initialState, action: Action) => _filtroReducer(state, action);
