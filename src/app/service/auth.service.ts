import { Injectable } from '@angular/core'; 
 
@Injectable({ 
    providedIn: 'root' 
}) 
export class AuthService { 
    constructor() { 
    } 
 
    getUserDetails() {
      const userInfo = localStorage.getItem('userInfo');
      return userInfo ? JSON.parse(userInfo) : null;
    }
     
    setDataInLocalStorage(variableName:string, data: string) { 
        localStorage.setItem(variableName, data); 
    } 
 
    getToken() { 
        return localStorage.getItem('token'); 
    } 
 
    clearStorage() { 
        localStorage.clear(); 
    } 
}