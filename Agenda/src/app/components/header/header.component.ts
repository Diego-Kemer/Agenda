import { Component, OnInit } from '@angular/core';
import { UiTaskService } from '../../service/ui-task.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: String = 'My task list';
  showAddTask: boolean = false;
  suscription: Subscription;
  constructor(
    private uiService: UiTaskService,
    private router: Router
  ) {
    this.suscription = this.uiService.ontoggle().subscribe(value => this.showAddTask = value)
   }

  ngOnInit(): void {
    this.uiService.guardada.subscribe(res=>{
      this.showAddTask = res
    })
  }

  toggleAddTask(){
    this.uiService.toogleAddTask();
  }

  hasrouter(route: string){
    return this.router.url === route
  }
}
