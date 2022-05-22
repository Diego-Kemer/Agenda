import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import  {Task} from '../../task'
import { UiTaskService } from '../../service/ui-task.service';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/service/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter()
  titulo: string = "";
  public hora: Date | undefined;
  reminder: boolean = false;
  activo: boolean = false;
  showAddTTask: boolean = false;
  subscription?: Subscription;

  constructor(
    private uiservice: UiTaskService,
    private taskS: TaskService,
    private router: Router
  ) { 
    this.subscription = this.uiservice.ontoggle().subscribe(vallue =>{ this.showAddTTask = vallue })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.titulo == ""){
      alert('Please add a task!')
      return
    }
    const {titulo, hora, reminder, activo} = this
    const newTask = { titulo, hora, reminder, activo}
    this.uiservice.revisa.emit(true)
    this.taskS.addTask(newTask).subscribe(res=>{
      this.uiservice.guardada.emit(false)
      console.log(res)
      this.uiservice.revisa.emit(false)
      this.redirectTo('/ma')
    })
    // this.onAddTask.emit(newTask)

  }
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
