import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UiTaskService {
  @Output() load: EventEmitter<any> = new EventEmitter();
  @Output() revisa: EventEmitter<any> = new EventEmitter() ;
  @Output() guardada: EventEmitter<any> = new EventEmitter() 
  private showAddTassk: boolean = false;
  private subjet = new Subject<any>();


  constructor() { }

  toogleAddTask():void{
    this.showAddTassk = !this.showAddTassk;
    this.subjet.next(this.showAddTassk)
  }

  ontoggle(): Observable<any>{
    return this.subjet.asObservable();
  }
  cambiar(){
    return this.showAddTassk = true
  }

  
}
