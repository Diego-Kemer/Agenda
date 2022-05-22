import { Injectable } from '@angular/core';
import {Task} from '../task'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable, of} from 'rxjs';
import { globalesVars } from '../global'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = globalesVars.url + '/task'
  public local:any = window.localStorage.getItem('id')
  constructor(
    private http: HttpClient
  ) { }

  getTask(): Observable <any>{
    return this.http.get<any>(`${this.apiUrl}/${this.local}`)
  }

  editar(task: object, id: any): Observable<Object>{
    return this.http.put<object>(`${this.apiUrl}/tark/${id}`, task)
  }
  deleteTask(id: any): Observable<any>{
    const ur = `${this.apiUrl}/tark/${id}`
    return this.http.delete<any>(ur)
  }
  updateTaskReminder(task: any): Observable<Task>{
    const usl = `${this.apiUrl}/tark/${task._id}`
    return this.http.put<Task>(usl, task, httpOptions)
  }

  addTask(task: Task): Observable<Task>{
    return this.http.post<Task>(`${this.apiUrl}/addTarea/${this.local}`, task)
  }
}
