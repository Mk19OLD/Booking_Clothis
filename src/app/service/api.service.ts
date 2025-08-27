import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { map } from 'rxjs/operators'; 
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class ApiService { 
 
 
  private REST_API_SERVER = "http://127.0.0.1:8000/"; 
  constructor(private httpClient: HttpClient) { } 
 
  users(url: string) { 
    return this.httpClient.get(this.REST_API_SERVER+url).pipe(map(res => { 
      return res; 
    })); 
  } 
 
  login(url: string, data: any) { 
    return this.httpClient.post(this.REST_API_SERVER+url, data, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }).pipe(map(res => { 
      return res; 
    })); 
  }
  
  login_2(username: string, password: any) {
      this.httpClient.post('http://127.0.0.1:8080/users/login', {
      email: username,
      password: password
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: res => console.log('Connexion réussie', res),
      error: err => console.error('Erreur', err.error)
    });
  }

  putTypeRequest(url: string, data: any) { 
    return this.httpClient.put(this.REST_API_SERVER+url, data).pipe(map(res => { 
      return res; 
    })) 
  }   
}