import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from 'gifs/services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Search:</h5>
    <input
      type="text"
      placeholder="Search gifs..."
      class="form-control"
      #txtTagInput
      (keyup.enter)="searchTag()"
    />
  `,
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  searchTag() {
    const tag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(tag);

    this.tagInput.nativeElement.value = '';
  }
}
