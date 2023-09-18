import { Component, computed, signal } from '@angular/core';
import { User } from '@/signals/interfaces/user.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styles: [],
})
export class PropertiesPageComponent {
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
    const values: Record<keyof User, keyof User> = {
      id: 'id',
      email: 'email',
      first_name: 'first_name',
      last_name: 'last_name',
      avatar: 'avatar',
    };

    this.user.mutate(current => {

      if (field in values) {
        current[values[field]] = field === 'id'
          ? (Number(value) as never)
          : (value as never);
      }

    });
  }
}
