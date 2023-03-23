import { createAction, props } from "@ngrx/store";

export type filtrosValidos = 'todas' | 'completadas' | 'pendientes';

export const setFiltro = createAction(
  '[FILTRO] Set filtro',
  props<{ filtro: filtrosValidos }>()
);
