import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], field: string, order: string = 'asc'): any[] {
    if (!value || !field) {
      return value;
    }
    let sortedArray = value.sort((a, b) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    if (order === 'desc') {
      return sortedArray.reverse();
    }
    return sortedArray;
  }

}
