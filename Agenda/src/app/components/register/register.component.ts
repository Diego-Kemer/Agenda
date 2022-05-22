import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UiTaskService } from 'src/app/service/ui-task.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  @Output() volverGreen = new EventEmitter()
  errorPass: string = '';

  constructor( private tasSer: UiTaskService, private formB: FormBuilder) { 
    this.form = this.formB.group({
      us: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPass: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(res=>{
      this.errorPass = '';
      
    })
  }


  sendUser(): any{
    if (this.form.value.password != this.form.value.confirmPass) {
      return this.errorPass = 'La confirmación de la contraseña debe ser igual que la contraseña'
    }
    this.tasSer.load.emit(this.form.value)
  }
}
//this.usuario = {us: this.us}
      //