import { Component, OnInit, inject,DestroyRef} from '@angular/core';
import { ApiService } from '../../service/api.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(
    private _api : ApiService, 
   private _auth :AuthService, 
  ) { }

  ngOnInit(): void { 
    this.test_jwt() 
  }

  test_jwt(){ 
    this._api.users('test-jwt').subscribe((res: any) => { 
      console.log(res) 
 
    }, err => { 
      console.log(err) 
    }); 
  } 
}
