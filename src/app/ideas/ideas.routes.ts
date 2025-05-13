import { Route } from "@angular/router";
import { ListIdeaComponent } from "./list-idea/list-idea.component";
import { NewIdeaComponent } from "./new-idea/new-idea.component";

export const routes: Route[] = [
    {
        path: '',
        component: ListIdeaComponent,
        title: 'Ideas'
    },
    {
        path: 'new',
        component: NewIdeaComponent,
        title: 'New Idea'
    
    }
]