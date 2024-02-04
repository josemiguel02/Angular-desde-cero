import { Component, computed, effect, signal } from '@angular/core';
import { User } from '@/signals/interfaces/user.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styles: [],
})
export class PropertiesPageComponent {

  public counter = signal<number>(0);
  public user = signal<User>({
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg',
  });

  public fullName = computed<string>(
    () => `${this.user().first_name} ${this.user().last_name}`
  );

  public userEffect = effect(() => {
    const deps = `${this.user().first_name} - ${this.counter()}`;
    console.log(deps);
  });

  onFieldUpdated(field: keyof User, value: string) {

    // Forma #1
    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // });

    // Forma #2
    // this.user.update(current => ({
    //   ...current,
    //   [field]: value,
    // }));

    // Forma #3
    this.user.mutate(current => {
      if (field in current) {
        current[field] = value as never;
      }
    });
  }

  increase() {
    this.counter.update(current => current + 1);
  }
}
