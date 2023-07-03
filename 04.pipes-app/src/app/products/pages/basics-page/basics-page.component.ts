import { Component } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styles: [],
})
export class BasicsPageComponent {

  public nameLower: string = 'jose miguel';
  public nameUpper: string = 'JOSE MIGUEL';
  public fullName: string = 'jOse mIGuEl';

  public customDate: Date = new Date();

}
