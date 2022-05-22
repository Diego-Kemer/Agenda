import { HttpClient } from '@angular/common/http';
import { Injectable, Output,  EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { globalesVars } from "../global";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  @Output() log: EventEmitter<any> = new EventEmitter()
  public url = globalesVars.url + '/user'
  constructor( private http: HttpClient) { }

  saveUser(user: object): Observable<any>{
    return this.http.post<any>(this.url, user)
  }

  saveLocal(id: any){
    window.localStorage.setItem('id', id)
  }

  login(user: object): Observable<any>{
    return this.http.post<any>(`${this.url}/login`, user)
  }
}
