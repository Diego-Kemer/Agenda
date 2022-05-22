import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';
import { UiTaskService } from 'src/app/service/ui-task.service';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {
  public task:any;
  public cerrar: string = '';
  public titulo: string | undefined;
  public hora: Date | undefined;
  public cargando: boolean = false;
  @Input() editar:any;
  @Output() cancela: EventEmitter<any> = new EventEmitter()
  constructor(
    private serTask: UiTaskService, 
    private taskRutas: TaskService,
    private router: Router) { }

  ngOnInit(): void {
    this.titulo = this.editar.titulo
    this.hora = this.editar.hora
  }

  cancelar(){
    return this.cancela.emit(this.cerrar)
  }

  confirmar(id: any){
    this.cargando = !this.cargando
    const {titulo, hora} = this
    this.task = {titulo, hora}
    this.taskRutas.editar(this.task, id).subscribe(res=>{
      console.log(res)
      this.cargando = !this.cargando
      this.cancela.emit(this.cerrar)
      this.redirectTo('/ma');
    })
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
