import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UiTaskService } from './service/ui-task.service';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public cargando: boolean = false;

  constructor(
    private tasks: UiTaskService,
    private serUs: UserService,
    private route: Router,
    private cookie: CookieService
  ){

  }

  ngOnInit(): void {
    this.tasks.load.subscribe((res)=>{
      this.cargando = !this.cargando;
      this.serUs.saveUser(res).subscribe(res=>{
        if (res.error) {
          console.log(res)
          this.cargando = !this.cargando;
          alert(res.mensaje)
        }else{
          this.cargando = !this.cargando;
          this.route.navigate(['/ma'])
          console.log(res)
        }
        
      })
    })

    this.serUs.log.subscribe((res: any)=>{
      this.cargando = !this.cargando;
      this.serUs.login(res).subscribe((res:any)=>{ 
        console.log(res)
          if(res.error){
            this.cargando = !this.cargando;
            return alert(res.mensaje)
          }else{
            this.cargando = !this.cargando;
            this.route.navigate(['/ma'])
          }
          window.localStorage.setItem('id', res._id)
          this.cookie.set('token', res.data)
      })
    })
    this.tasks.revisa.subscribe(res=>{
      this.cargando = res
    })
  }

  

  volver(){
    return this.tasks.cambiar()
  }
  
}
