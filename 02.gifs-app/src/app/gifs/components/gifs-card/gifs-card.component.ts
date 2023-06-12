import { Gif } from '@/gifs/interfaces/gifs.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',
  styleUrls: ['./gifs-card.component.css'],
})
export class GifsCardComponent {
  @Input()
  public gif!: Gif;
}
