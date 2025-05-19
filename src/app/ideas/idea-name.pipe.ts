import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ideaName',
  standalone: true
})
export class IdeaNamePipe implements PipeTransform {

  transform(title: string, prefix: string): string {
    return `${prefix} ${title}`;
  }

}
