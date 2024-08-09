import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number | undefined): string {
    if (!value) {
      return '0';
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1) + ' mill';
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(1) + ' mil';
    } else {
      return value.toString();
    }
  }

}
