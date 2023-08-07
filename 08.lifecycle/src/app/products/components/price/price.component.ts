import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'products-price',
  templateUrl: './price.component.html',
  styles: [],
})
export class PriceComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public price: number = 0;

  ngOnInit(): void {
    console.log('Component Child: ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Component Child: ngOnChanges');
    console.log({ changes });
  }

  ngOnDestroy(): void {
    console.log('Component Child: ngOnDestroy');
  }
}
