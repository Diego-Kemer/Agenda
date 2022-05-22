import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
form: FormGroup;
  constructor(
    private userServ: UserService,
    private forB: FormBuilder
    ) { 
      this.form = this.forB.group({
        userLog: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(4)]]
      })
    }

  ngOnInit(): void {
  }

  login(){
    this.userServ.log.emit(this.form.value)
  }
}
