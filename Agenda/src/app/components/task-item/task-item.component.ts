import { Component, OnInit, Input, Output,  EventEmitter } from '@angular/core';
import {Task} from '../../task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { UiTaskService } from 'src/app/service/ui-task.service';
import { TaskService } from 'src/app/service/task.service';
import * as moment from 'moment';
moment.locale('es')

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  public editar: boolean = false;
  public datos:any;
  public activado: boolean = false;
  
  @Input() activo!: boolean;
  @Input() task: any;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter()
  @Output() onToggleRimander: EventEmitter<Task> = new EventEmitter();
  @Output() editarTask: EventEmitter<Task> = new EventEmitter()
  faTimes = faTimes;
  public datas: any; 
  public mes: any;

  constructor(private serTask: UiTaskService, private taskRutas: TaskService) { }

  ngOnInit(): void {
    this.mes = moment(this.task.hora).format('dddd D MMMM YYYY, h:mm')
    // const holo = this.mes.getMonth()
    // console.log(new Intl.DateTimeFormat('en-ES', {month: 'long'}).format(holo));
    console.log(this.mes)
    this.activado = this.activo
  }
  onDelete(id: any){

    this.taskRutas.deleteTask(id).subscribe(res=>{
      console.log(res)
    })
  }

  onToggle(task: Task){
    this.onToggleRimander.emit(task);
  }

  edit(e:any){
    this.editar = true;
    this.datas = e;
    console.log(e._id)
  }

  cierre(){
    this.editar = false
  }
  apagarAlarma(){
    this.activo = false
    this.activado = false
  }
}
