import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'myPipe'
})
export class MyUppercasePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return '****';
  }
}
