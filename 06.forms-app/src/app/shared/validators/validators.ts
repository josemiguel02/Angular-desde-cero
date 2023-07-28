import { FormControl } from '@angular/forms';

export const cantBeStrider = (control: FormControl) => {

  const value = (control.value as string).trim().toLowerCase();

  if (value === 'strider') {
    return {
      noStrider: true,
    };
  }

  return null;
};
