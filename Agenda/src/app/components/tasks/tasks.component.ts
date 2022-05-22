import { Component, Input, OnInit } from '@angular/core';
import { UiTaskService } from 'src/app/service/ui-task.service';
import { TaskService } from '../../service/task.service';
import { Task } from '../../task'
import * as moment from 'moment';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  
 

  constructor(
    private taskservice: TaskService
  ) { }

  ngOnInit(): void {
    let reviso: any;
    this.taskservice.getTask().subscribe((tasks)=>{
      this.tasks = tasks.tareas
      console.log(this.tasks)
      reviso = tasks.tareas
    });
    (function repeat(){
      // if (++i > 5) return;

      setTimeout(function(){
        if(new Date().getSeconds() < 5){
          for (let index = 0; index < reviso.length; index++) {
            const element = reviso[index];
            if (moment(element.hora).format('dddd D MMMM YYYY, h:m') == moment(new Date()).format('dddd D MMMM YYYY, h:mm') && element.activo != true) {
              element.activo = true;
              console.log(element);
              // console.log(element.classList);
              let sonido = new Audio('../../assets/radar.mp3');
              sonido.play()
            }else{
              element.activo = false;
            }
            ;
          }
        }
        repeat();
      }, 6000);
    })();
    
  }

  deleteTask(task: Task){
    this.taskservice.deleteTask(task).subscribe(()=>{
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    })
  }

  toggleReminder(task: Task){
    task.reminder = !task.reminder
    this.taskservice.updateTaskReminder(task).subscribe()
  }

  addTask(task: Task){
    this.taskservice.addTask(task).subscribe(task =>{
      this.tasks.push(task)
    })
  }
}
