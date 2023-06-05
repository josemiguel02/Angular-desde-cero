import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-add-character',
  templateUrl: './add-character.component.html',
})
export class AddCharacterComponent {
  @Output()
  public onNewCharacter: EventEmitter<Character> = new EventEmitter();

  public character: Character = {
    name: '',
    power: null,
  };

  emitCharacter(): void {
    if (!this.character.name.trim()) return;
    this.onNewCharacter.emit(this.character);
    this.character = {
      name: '',
      power: null,
    };
  }
}
