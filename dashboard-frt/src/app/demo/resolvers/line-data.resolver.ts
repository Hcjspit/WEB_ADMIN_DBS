import { ResolveFn } from '@angular/router';

export const lineDataResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
