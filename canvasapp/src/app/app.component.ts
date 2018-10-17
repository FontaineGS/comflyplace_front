import { Component } from '@angular/core';
import { Point} from './point'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private router : Router)
  {

  }

  Display()
  {
    this.router.navigate(['/main']);
  }
}
