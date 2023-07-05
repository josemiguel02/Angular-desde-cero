import { Component } from '@angular/core';
import { Color, Hero } from '@/products/interfaces/hero.interface';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styles: [],
})
export class OrderPageComponent {

  public isUpperCase: boolean = false;
  public orderBy?: keyof Hero;

  public heroes: Array<Hero> = [
    {
      name: 'Superman',
      canfly: true,
      color: Color.blue,
    },
    {
      name: 'Batman',
      canfly: false,
      color: Color.black,
    },
    {
      name: 'Daredevil',
      canfly: false,
      color: Color.red,
    },
    {
      name: 'Robin',
      canfly: true,
      color: Color.red,
    },
    {
      name: 'Linterna verde',
      canfly: true,
      color: Color.green,
    },
  ];

  toggleUpperCase() {
    this.isUpperCase = !this.isUpperCase;
  }

  changeOrder(value: keyof Hero) {
    this.orderBy = value;
  }
}
