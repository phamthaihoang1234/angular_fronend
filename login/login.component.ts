import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string | undefined;
  formLogin: FormGroup | undefined;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      fullName: [''],
      password: ['']
    });
  }

  login() {
    // @ts-ignore
    this.authService.login(this.formLogin.value).subscribe(res => {
      if (res.error === 'Unauthorized') {
        console.log('3232');
        this.message = 'Unauthorized';
      } else {
        localStorage.setItem('token', res.token);
        this.router.navigate(['admin']);
      }
    });
  }

}
