import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {

  transform(heroes: Hero[], sortBy?: keyof Hero): Hero[] {

    const order: Record<keyof Hero, () => Hero[]> = {
      name: () => heroes.sort(
        (a, b) => a.name > b.name ? 1 : -1
      ),
      canfly: () => heroes.sort(
        (a, b) => a.canfly > b.canfly ? 1 : -1
      ),
      color: () => heroes.sort(
        (a, b) => a.color > b.color ? 1 : -1
      ),
    };

    return sortBy ? order[sortBy]() : heroes;
  }
}
