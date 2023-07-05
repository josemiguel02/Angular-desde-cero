import { Component } from '@angular/core';
import { interval, tap } from 'rxjs';

type Gender = 'male' | 'female';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styles: [],
})
export class UncommonPageComponent {

  // i18n Select
  public name: string = 'Jose';
  public gender: Gender = 'male';
  public invitationMap: Record<Gender, string> = {
    male: 'invitarlo',
    female: 'invitarla',
  };

  changeClient() {
    this.name = 'Melissa';
    this.gender = 'female';
  }


  // i18n Plural
  public clients: string[] = [
    'Maria',
    'Pedro',
    'Fernando',
    'Hernando',
    'Eduardo',
    'Melissa',
    'Natalia',
  ];
  public clientsMap = {
    '=0': 'no tenemos ningún cliente esperando.',
    '=1': 'tenemos un cliente esperando.',
    '=2': 'tenemos 2 personas esperando.',
    'other': 'tenemos # clientes esperando.'
  };

  deleteClient() {
    this.clients.shift();
  }

  // KeyValue Pipe
  public person = {
    name: 'José Miguel',
    age: 23,
    address: 'Gye/Ecu',
  }

  // Async Pipe
  public myObservableTimer = interval(2000)
    .pipe(
      tap(value => console.log('tap:', value))
    );

  public myPromise = new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('Tenemos data en la promesa.')

      console.log('Promise execute...')
    }, 3500);
  });
}
