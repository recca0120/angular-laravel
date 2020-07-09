import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {filter, tap} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  info: any = null;
  myGroup: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.myGroup = this.fb.group({
      'email': ['gussie16@example.net'],
      'password': ['password']
    });
  }

  onSubmit() {
    this.http.post('http://angular-laravel.test/api/auth/login', this.myGroup.value).subscribe();
  }

  getInfo() {
    this.http.post('http://angular-laravel.test/api/auth/me', []).subscribe(response => this.info = response);
  }
}
