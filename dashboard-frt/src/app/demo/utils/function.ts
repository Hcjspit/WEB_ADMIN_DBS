import { ChangeDetectorRef } from '@angular/core';

export const resetChart = (array: any[], cdr: ChangeDetectorRef) => {
  array.length = 0;
  cdr.detectChanges();
};
