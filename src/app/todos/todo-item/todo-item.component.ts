import { FormControl, Validators } from '@angular/forms';
import { Todo } from './../models/todo.model';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @ViewChild('inputFisico', { static: false }) txtInputFisico!: ElementRef;

  @Input() todo!: Todo;

  checkCompletado: FormControl = new FormControl(false);
  txtInput: FormControl = new FormControl('');

  editando = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.checkCompletado = new FormControl(this.todo?.completado);
    this.txtInput = new FormControl(this.todo?.texto, Validators.required);
    this.checkCompletado.valueChanges.subscribe(value => {
      this.store.dispatch(actions.toggle({ id: this.todo.id }));
    });
  }

  editar() {
    this.txtInput.setValue(this.todo?.texto);
    this.editando = true;
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  eliminar() {
    this.store.dispatch(actions.eliminar({ id: this.todo.id }));
  }

  terminarEdicion() {
    this.editando = false;

    if (this.txtInput.value === this.todo?.texto) return;
    if (this.txtInput.invalid) return;

    this.store.dispatch(actions.editar({id: this.todo.id, texto: this.txtInput.value}));
  }

}
