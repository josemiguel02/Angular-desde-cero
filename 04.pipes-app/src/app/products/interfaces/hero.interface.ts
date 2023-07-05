export enum Color {
  red,
  black,
  blue,
  green,
}

export interface Hero {
  name: string;
  canfly: boolean;
  color: Color;
}
