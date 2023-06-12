import { Component } from '@angular/core';
import { GifsService } from 'gifs/services/gifs.service';
import { Gif } from 'gifs/interfaces/gifs.interface';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(private gifsService: GifsService) {}

  get gifs(): Array<Gif> {
    return this.gifsService.gifList;
  }
}
