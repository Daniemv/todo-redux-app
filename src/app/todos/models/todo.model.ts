export class Todo {
  public id: number;
  public texto: string;
  public completado: boolean;

  constructor(texto: string) {
    this.id = Math.random() * 10;
    this.texto = texto;
    this.completado = false;
  }
}
