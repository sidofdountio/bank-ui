import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
  standalone: true
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value == null || isNaN(Number(value))) { return ''; }
    return Number(value).toLocaleString('fr-FR').replace(/,/g, ' ');
  }

}
