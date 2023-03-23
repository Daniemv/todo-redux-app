import { Pipe, PipeTransform } from '@angular/core';
import { filtrosValidos } from '../filtro/filtro.actions';
import { Todo } from './models/todo.model';

@Pipe({
  name: 'filtroTodo'
})
export class FiltroPipe implements PipeTransform {

  transform(todoCollection: Todo[], filtro: filtrosValidos): Todo[] {

    switch(filtro) {
      case 'completadas':
        return todoCollection.filter(todo => todo.completado);
      case 'pendientes':
        return todoCollection.filter(todo => !todo.completado);
      default:
        return todoCollection;
    }
  }

}
