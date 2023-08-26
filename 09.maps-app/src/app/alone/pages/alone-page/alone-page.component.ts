import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterAloneComponent } from '@/alone/components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '@/alone/components/side-menu/side-menu.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CounterAloneComponent,
    SideMenuComponent,
  ],
  templateUrl: './alone-page.component.html',
  styles: [],
})
export class AlonePageComponent {}
