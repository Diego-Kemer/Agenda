import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop'

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BotonComponent } from './components/boton/boton.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormEditComponent } from './components/form-edit/form-edit.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginComponent } from './components/login/login.component';
import { GuardUserGuard } from './guard-user.guard';
import { CookieService } from 'ngx-cookie-service';
import { InerceptarPeticionesInterceptor } from './inerceptar-peticiones.interceptor';


const route: Routes = [
  {path: '', component: LoginComponent},
  {path: 'ma', component: TasksComponent, canActivate: [GuardUserGuard]},
  {path: 'register', component: RegisterComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BotonComponent,
    TasksComponent,
    TaskItemComponent,
    AddTaskComponent,
    RegisterComponent,
    FooterComponent,
    FormEditComponent,
    LoadingComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    RouterModule.forRoot(route, {enableTracing: true})
  ],
  providers: [
    CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: InerceptarPeticionesInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
