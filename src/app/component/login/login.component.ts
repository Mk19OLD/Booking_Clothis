import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  private myService = inject(ApiService);
  // private _auth = inject(AuthService);
  private destroyRef = inject(DestroyRef);  
  constructor(public fb: FormBuilder,private _api : ApiService,private _auth: AuthService,private router: Router, ) {
    
  }
    
  ngOnInit(): void {
    this.form = this.fb.group({ 
      username: ['', Validators.required], 
      password: ['', Validators.required] 
    }); 

    
  }
  test_log(){
    let b = this.form.value 
    this.myService.login('login', b)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data:any) => {
        console.log(data);
        if(data.access_token){ 
        this._auth.setDataInLocalStorage('token', data.access_token) 
        this.router.navigate(['profile']) 
      } 
      });
  }
  
  // login(){ 
  //   let b = this.form.value 
  //   console.log(b);
  //   let logchaine = "users/login"
  //   this._api.login(logchaine, b).subscribe((res: any) => { 
  //     console.log(res) 
  //     if(res.access_token){ 
  //       this._auth.setDataInLocalStorage('token', res.access_token) 
  //       this.router.navigate(['home']) 
  //     } 
  //   }, err => { 
  //     console.log(err) 
  //   });
    
  // }
  
  login() {
  if (!this.form.valid) return;

  const body = new URLSearchParams();
  body.set('username', this.form.value.username);
  body.set('password', this.form.value.password);

  this._api.login('users/login', body.toString()).pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (res: any) => {
        console.log('Connexion réussie', res);
        if (res.access_token) {
          this._auth.setDataInLocalStorage('token', res.access_token);
          this.router.navigate(['home']);
        }
      },
      error: (err) => console.error('Erreur login:', err.error)
    });
}

  users(){
    let user = "users/"
    this._api.users(user).subscribe((resp:any) =>{
      console.log(resp) 
    },err =>{
      console.log(err)
    });
  }

  testlog(){
    let b = this.form.value
    
    this._api.login_2(b.username, b.password)
  }
}
