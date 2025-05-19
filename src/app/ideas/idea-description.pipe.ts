import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ideaDescription',
  standalone: true
})
export class IdeaDescriptionPipe implements PipeTransform {

  transform(description: string ): string {
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
  }

}
