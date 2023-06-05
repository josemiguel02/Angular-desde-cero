import { Component, ElementRef, ViewChild } from '@angular/core';

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

  searchTag() {
    const tag = this.tagInput.nativeElement.value;

    console.log({ tag });

    this.tagInput.nativeElement.value = '';
  }
}
