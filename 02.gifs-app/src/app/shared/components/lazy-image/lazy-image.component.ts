import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css'],
})
export class LazyImageComponent {
  @Input()
  public url!: string;

  @Input()
  public alt!: string;

  public isLoading: boolean = true;

  onLoad() {
    this.isLoading = false;
  }
}
