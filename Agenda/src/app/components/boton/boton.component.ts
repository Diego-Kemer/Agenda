import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.css']
})
export class BotonComponent implements OnInit {

  @Input() text: String = "";
  @Input() color: String = "";
  @Output() btnClick = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  onclick(){
    this.btnClick.emit()
  }

}
